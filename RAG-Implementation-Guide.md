# RAG功能创建指南 - 数字博物馆AI助手

## 📋 项目概述

为"溯本求源·文润经心"数字博物馆AI助手添加RAG（检索增强生成）功能，主要支持docx文件解析，增强AI回答的准确性和相关性。

## 🎯 功能目标

1. **文档解析**：支持上传和解析docx文件
2. **向量化存储**：将文档内容转换为向量并存储
3. **智能检索**：根据用户问题检索相关文档片段
4. **增强回答**：结合检索到的内容生成更准确的回答

## 🏗️ 当前系统架构分析

### 前端架构
- **AI对话组件**: `AIDialog.vue`, `AIFloatingAssistant.vue`
- **API调用**: 通过 `/api/chat` 接口与后端通信
- **消息格式**: `{message: string, history: array}`

### 后端架构
- **路由层**: `routes/chat.js`
- **控制器**: `controllers/chatController.js`
- **服务层**: `services/chatService.js`
- **LLM服务**: `services/llmService.js`
- **提供商**: `llm/providers/qwen.js`

## 📋 实施计划

### 阶段1：环境准备与依赖安装 (30分钟)

#### 1.1 安装后端依赖
```bash
cd backend
npm install mammoth pdf-parse multer @xenova/transformers faiss-node sqlite3 uuid
```

#### 1.2 安装前端依赖
```bash
cd frontend
npm install
```

#### 1.3 创建必要的目录结构
```bash
# 在backend目录下创建
mkdir -p rag/services
mkdir -p rag/models  
mkdir -p rag/storage
mkdir -p uploads
mkdir -p vector-db
```

### 阶段2：文档解析服务 (45分钟)

#### 2.1 创建文档解析器
创建 `backend/rag/services/documentParser.js`:

```javascript
// rag/services/documentParser.js
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');

class DocumentParser {
  async parseDocx(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return {
        text: result.text,
        metadata: {
          fileName: path.basename(filePath),
          fileSize: (await fs.stat(filePath)).size,
          parseDate: new Date().toISOString()
        }
      };
    } catch (error) {
      throw new Error(`DOCX解析失败: ${error.message}`);
    }
  }

  // 将长文本分割成块
  chunkText(text, chunkSize = 500, overlap = 50) {
    const chunks = [];
    let start = 0;
    
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunk = text.slice(start, end);
      
      chunks.push({
        content: chunk.trim(),
        start,
        end,
        length: chunk.length
      });
      
      start = end - overlap;
    }
    
    return chunks;
  }
}

module.exports = new DocumentParser();
```

#### 2.2 创建文件上传控制器
创建 `backend/controllers/uploadController.js`:

```javascript
// controllers/uploadController.js
const multer = require('multer');
const path = require('path');
const documentParser = require('../rag/services/documentParser');
const vectorService = require('../rag/services/vectorService');

// 配置multer存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('只支持.docx文件'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB限制
  }
});

class UploadController {
  constructor() {
    this.uploadMiddleware = upload.single('document');
  }

  async uploadDocument(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: '请选择要上传的docx文件'
        });
      }

      console.log('开始处理文档:', req.file.originalname);

      // 解析文档
      const parsed = await documentParser.parseDocx(req.file.path);
      
      // 分块处理
      const chunks = documentParser.chunkText(parsed.text);
      
      // 向量化并存储
      const documentId = await vectorService.addDocument(
        req.file.originalname,
        chunks,
        parsed.metadata
      );

      res.json({
        success: true,
        message: '文档上传并处理成功',
        documentId,
        chunksCount: chunks.length,
        metadata: parsed.metadata
      });

    } catch (error) {
      console.error('文档上传处理错误:', error);
      res.status(500).json({
        success: false,
        error: error.message || '文档处理失败'
      });
    }
  }

  async listDocuments(req, res) {
    try {
      const documents = await vectorService.listDocuments();
      res.json({
        success: true,
        documents
      });
    } catch (error) {
      console.error('获取文档列表错误:', error);
      res.status(500).json({
        success: false,
        error: '获取文档列表失败'
      });
    }
  }

  async deleteDocument(req, res) {
    try {
      const { documentId } = req.params;
      await vectorService.deleteDocument(documentId);
      
      res.json({
        success: true,
        message: '文档删除成功'
      });
    } catch (error) {
      console.error('删除文档错误:', error);
      res.status(500).json({
        success: false,
        error: '删除文档失败'
      });
    }
  }
}

module.exports = new UploadController();
```

### 阶段3：向量化服务 (60分钟)

#### 3.1 创建向量服务
创建 `backend/rag/services/vectorService.js`:

```javascript
// rag/services/vectorService.js
const { pipeline } = require('@xenova/transformers');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class VectorService {
  constructor() {
    this.embedder = null;
    this.db = null;
    this.initPromise = this.initialize();
  }

  async initialize() {
    try {
      // 初始化文本嵌入模型
      console.log('正在加载嵌入模型...');
      this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      
      // 初始化SQLite数据库
      const dbPath = path.join(__dirname, '../../vector-db/documents.db');
      this.db = new sqlite3.Database(dbPath);
      
      // 创建表结构
      await this.createTables();
      
      console.log('向量服务初始化完成');
    } catch (error) {
      console.error('向量服务初始化失败:', error);
      throw error;
    }
  }

  async createTables() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // 文档表
        this.db.run(`
          CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            metadata TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        // 文档块表
        this.db.run(`
          CREATE TABLE IF NOT EXISTS document_chunks (
            id TEXT PRIMARY KEY,
            document_id TEXT,
            content TEXT NOT NULL,
            start_pos INTEGER,
            end_pos INTEGER,
            vector_data TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (document_id) REFERENCES documents (id)
          )
        `, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  }

  async getEmbedding(text) {
    await this.initPromise;
    const output = await this.embedder(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  }

  async addDocument(name, chunks, metadata) {
    await this.initPromise;
    
    const documentId = uuidv4();
    
    return new Promise((resolve, reject) => {
      this.db.serialize(async () => {
        // 开始事务
        this.db.run('BEGIN TRANSACTION');
        
        try {
          // 插入文档记录
          this.db.run(
            'INSERT INTO documents (id, name, metadata) VALUES (?, ?, ?)',
            [documentId, name, JSON.stringify(metadata)]
          );
          
          // 处理每个文档块
          for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const chunkId = uuidv4();
            
            // 获取向量表示
            const vector = await this.getEmbedding(chunk.content);
            
            // 插入块记录
            this.db.run(
              'INSERT INTO document_chunks (id, document_id, content, start_pos, end_pos, vector_data) VALUES (?, ?, ?, ?, ?, ?)',
              [chunkId, documentId, chunk.content, chunk.start, chunk.end, JSON.stringify(vector)]
            );
          }
          
          // 提交事务
          this.db.run('COMMIT', (err) => {
            if (err) reject(err);
            else resolve(documentId);
          });
          
        } catch (error) {
          // 回滚事务
          this.db.run('ROLLBACK');
          reject(error);
        }
      });
    });
  }

  async searchSimilar(query, limit = 5) {
    await this.initPromise;
    
    // 获取查询的向量表示
    const queryVector = await this.getEmbedding(query);
    
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          dc.id,
          dc.document_id,
          dc.content,
          dc.vector_data,
          d.name as document_name
        FROM document_chunks dc
        JOIN documents d ON dc.document_id = d.id
      `, async (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        
        try {
          // 计算相似度
          const results = rows.map(row => {
            const vector = JSON.parse(row.vector_data);
            const similarity = this.cosineSimilarity(queryVector, vector);
            
            return {
              id: row.id,
              documentId: row.document_id,
              documentName: row.document_name,
              content: row.content,
              similarity
            };
          });
          
          // 按相似度排序并返回top结果
          results.sort((a, b) => b.similarity - a.similarity);
          resolve(results.slice(0, limit));
          
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  async listDocuments() {
    await this.initPromise;
    
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          d.id,
          d.name,
          d.metadata,
          d.created_at,
          COUNT(dc.id) as chunks_count
        FROM documents d
        LEFT JOIN document_chunks dc ON d.id = dc.document_id
        GROUP BY d.id, d.name, d.metadata, d.created_at
        ORDER BY d.created_at DESC
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(row => ({
          ...row,
          metadata: JSON.parse(row.metadata)
        })));
      });
    });
  }

  async deleteDocument(documentId) {
    await this.initPromise;
    
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');
        
        this.db.run('DELETE FROM document_chunks WHERE document_id = ?', [documentId]);
        this.db.run('DELETE FROM documents WHERE id = ?', [documentId], function(err) {
          if (err) {
            this.db.run('ROLLBACK');
            reject(err);
          } else {
            this.db.run('COMMIT', (commitErr) => {
              if (commitErr) reject(commitErr);
              else resolve();
            });
          }
        });
      });
    });
  }
}

module.exports = new VectorService();
```

### 阶段4：RAG集成服务 (45分钟)

#### 4.1 创建RAG服务
创建 `backend/rag/services/ragService.js`:

```javascript
// rag/services/ragService.js
const vectorService = require('./vectorService');

class RAGService {
  async enhanceQuery(message, history = []) {
    try {
      // 检索相关文档片段
      const relevantChunks = await vectorService.searchSimilar(message, 3);
      
      if (relevantChunks.length === 0) {
        return {
          enhancedMessage: message,
          context: null,
          sources: []
        };
      }
      
      // 构建上下文
      const context = relevantChunks.map((chunk, index) => 
        `[文档${index + 1}: ${chunk.documentName}]\n${chunk.content}`
      ).join('\n\n');
      
      // 增强消息
      const enhancedMessage = `基于以下相关文档内容回答用户问题：

${context}

用户问题：${message}

请基于上述文档内容回答，如果文档中没有相关信息，请说明并提供一般性回答。`;

      return {
        enhancedMessage,
        context,
        sources: relevantChunks.map(chunk => ({
          documentName: chunk.documentName,
          similarity: chunk.similarity,
          preview: chunk.content.substring(0, 100) + '...'
        }))
      };
      
    } catch (error) {
      console.error('RAG增强查询错误:', error);
      return {
        enhancedMessage: message,
        context: null,
        sources: [],
        error: error.message
      };
    }
  }

  async getDocumentStats() {
    try {
      const documents = await vectorService.listDocuments();
      return {
        totalDocuments: documents.length,
        totalChunks: documents.reduce((sum, doc) => sum + doc.chunks_count, 0),
        documents: documents.map(doc => ({
          id: doc.id,
          name: doc.name,
          chunksCount: doc.chunks_count,
          createdAt: doc.created_at
        }))
      };
    } catch (error) {
      console.error('获取文档统计错误:', error);
      throw error;
    }
  }
}

module.exports = new RAGService();
```

#### 4.2 更新聊天服务
修改 `backend/services/chatService.js`:

```javascript
// services/chatService.js - 聊天业务服务
const llmService = require('./llmService');
const ragService = require('../rag/services/ragService');

class ChatService {
  async processMessage(message, history, useRAG = true) {
    try {
      // 预处理消息
      const processedMessage = this.preprocessMessage(message);
      
      // 过滤和验证历史记录
      const validHistory = this.validateHistory(history);
      
      let finalMessage = processedMessage;
      let ragInfo = null;
      
      // 如果启用RAG，增强查询
      if (useRAG) {
        const ragResult = await ragService.enhanceQuery(processedMessage, validHistory);
        finalMessage = ragResult.enhancedMessage;
        ragInfo = {
          sources: ragResult.sources,
          hasContext: !!ragResult.context
        };
      }
      
      // 调用LLM服务
      const response = await llmService.generateResponse(finalMessage, validHistory);
      
      // 后处理响应
      const processedResponse = this.postprocessResponse(response);
      
      return {
        message: processedResponse,
        ragInfo
      };
    } catch (error) {
      console.error('聊天服务处理错误:', error);
      throw error;
    }
  }

  preprocessMessage(message) {
    // 清理和标准化用户输入
    return message.trim();
  }

  validateHistory(history) {
    // 验证和过滤历史记录
    if (!Array.isArray(history)) {
      return [];
    }

    return history
      .filter(msg => msg && typeof msg === 'object' && msg.text && msg.role)
      .slice(-10); // 只保留最近10条记录
  }

  postprocessResponse(response) {
    // 后处理AI响应
    if (!response || typeof response !== 'string') {
      throw new Error('无效的AI响应');
    }

    return response.trim();
  }
}

module.exports = new ChatService();
```

### 阶段5：路由和API (30分钟)

#### 5.1 创建上传路由
创建 `backend/routes/upload.js`:

```javascript
// routes/upload.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// 上传文档
router.post('/document', uploadController.uploadMiddleware, uploadController.uploadDocument);

// 获取文档列表
router.get('/documents', uploadController.listDocuments);

// 删除文档
router.delete('/document/:documentId', uploadController.deleteDocument);

module.exports = router;
```

#### 5.2 创建RAG管理路由
创建 `backend/routes/rag.js`:

```javascript
// routes/rag.js
const express = require('express');
const router = express.Router();
const ragService = require('../rag/services/ragService');

// 获取RAG统计信息
router.get('/stats', async (req, res) => {
  try {
    const stats = await ragService.getDocumentStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('获取RAG统计错误:', error);
    res.status(500).json({
      success: false,
      error: '获取统计信息失败'
    });
  }
});

// 测试检索
router.post('/search', async (req, res) => {
  try {
    const { query, limit = 5 } = req.body;
    const vectorService = require('../rag/services/vectorService');
    const results = await vectorService.searchSimilar(query, limit);
    
    res.json({
      success: true,
      query,
      results
    });
  } catch (error) {
    console.error('检索测试错误:', error);
    res.status(500).json({
      success: false,
      error: '检索失败'
    });
  }
});

module.exports = router;
```

#### 5.3 更新主服务器
修改 `backend/server.js`，添加新路由:

```javascript
// 在现有路由后添加
app.use('/api/upload', require('./routes/upload'));
app.use('/api/rag', require('./routes/rag'));
```

#### 5.4 更新聊天控制器
修改 `backend/controllers/chatController.js`:

```javascript
// controllers/chatController.js - 聊天控制器
const chatService = require('../services/chatService');

class ChatController {
  async handleChat(req, res) {
    try {
      const { message, history = [], useRAG = true } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({
          success: false,
          error: '消息内容不能为空'
        });
      }

      console.log('收到聊天请求:', { message, historyLength: history.length, useRAG });
      
      // 调用聊天服务
      const result = await chatService.processMessage(message, history, useRAG);
      
      res.json({
        success: true,
        message: result.message,
        ragInfo: result.ragInfo,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('聊天处理错误:', error);
      res.status(500).json({
        success: false,
        error: error.message || '抱歉，AI服务暂时不可用，请联系网站管理员解决问题'
      });
    }
  }

  // ... 其他方法保持不变
}

module.exports = new ChatController();
```

### 阶段6：前端集成 (45分钟)

#### 6.1 创建文档管理组件
创建 `frontend/src/components/DocumentManager.vue`:

```vue
<template>
  <div class="document-manager">
    <div class="upload-section">
      <h3>文档上传</h3>
      <div class="upload-area" @dragover.prevent @drop="handleDrop">
        <input 
          ref="fileInput" 
          type="file" 
          accept=".docx" 
          @change="handleFileSelect" 
          style="display: none"
        />
        <button @click="$refs.fileInput.click()" class="upload-btn">
          选择DOCX文件
        </button>
        <p>或拖拽文件到此处</p>
        <div v-if="uploading" class="uploading">
          上传中... {{ uploadProgress }}%
        </div>
      </div>
    </div>

    <div class="documents-section">
      <h3>已上传文档</h3>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="documents.length === 0" class="empty">
        暂无文档
      </div>
      <div v-else class="documents-list">
        <div 
          v-for="doc in documents" 
          :key="doc.id" 
          class="document-item"
        >
          <div class="doc-info">
            <h4>{{ doc.name }}</h4>
            <p>块数: {{ doc.chunks_count }} | 创建时间: {{ formatDate(doc.created_at) }}</p>
          </div>
          <button @click="deleteDocument(doc.id)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <h3>RAG统计</h3>
      <div v-if="stats" class="stats">
        <p>总文档数: {{ stats.totalDocuments }}</p>
        <p>总块数: {{ stats.totalChunks }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentManager',
  data() {
    return {
      documents: [],
      stats: null,
      loading: false,
      uploading: false,
      uploadProgress: 0
    }
  },
  mounted() {
    this.loadDocuments();
    this.loadStats();
  },
  methods: {
    async loadDocuments() {
      this.loading = true;
      try {
        const response = await fetch('/api/upload/documents');
        const data = await response.json();
        if (data.success) {
          this.documents = data.documents;
        }
      } catch (error) {
        console.error('加载文档失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadStats() {
      try {
        const response = await fetch('/api/rag/stats');
        const data = await response.json();
        if (data.success) {
          this.stats = data.stats;
        }
      } catch (error) {
        console.error('加载统计失败:', error);
      }
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadFile(file);
      }
    },

    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.uploadFile(files[0]);
      }
    },

    async uploadFile(file) {
      if (!file.name.endsWith('.docx')) {
        alert('只支持.docx文件');
        return;
      }

      this.uploading = true;
      this.uploadProgress = 0;

      const formData = new FormData();
      formData.append('document', file);

      try {
        const response = await fetch('/api/upload/document', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        
        if (data.success) {
          alert(`文档上传成功！处理了 ${data.chunksCount} 个文本块`);
          this.loadDocuments();
          this.loadStats();
        } else {
          alert('上传失败: ' + data.error);
        }
      } catch (error) {
        console.error('上传错误:', error);
        alert('上传失败: ' + error.message);
      } finally {
        this.uploading = false;
        this.uploadProgress = 0;
      }
    },

    async deleteDocument(documentId) {
      if (!confirm('确定要删除这个文档吗？')) return;

      try {
        const response = await fetch(`/api/upload/document/${documentId}`, {
          method: 'DELETE'
        });

        const data = await response.json();
        
        if (data.success) {
          alert('文档删除成功');
          this.loadDocuments();
          this.loadStats();
        } else {
          alert('删除失败: ' + data.error);
        }
      } catch (error) {
        console.error('删除错误:', error);
        alert('删除失败: ' + error.message);
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleString('zh-CN');
    }
  }
}
</script>

<style scoped>
.document-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-section, .documents-section, .stats-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: border-color 0.3s;
}

.upload-area:hover {
  border-color: #007bff;
}

.upload-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.documents-list {
  max-height: 300px;
  overflow-y: auto;
}

.document-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.loading, .empty, .uploading {
  text-align: center;
  color: #666;
  padding: 20px;
}

.stats {
  display: flex;
  gap: 20px;
}

.stats p {
  margin: 5px 0;
  font-weight: bold;
}
</style>
```

#### 6.2 更新AI对话组件
修改 `frontend/src/components/AIDialog.vue`，添加RAG功能显示:

```vue
<!-- 在消息显示部分添加RAG信息 -->
<div v-for="(m,i) in messages" :key="i" class="msg" :class="m.role">
  <div class="bubble">
    {{ m.text }}
    <div v-if="m.ragInfo && m.ragInfo.sources.length > 0" class="rag-sources">
      <small>参考文档:</small>
      <ul>
        <li v-for="source in m.ragInfo.sources" :key="source.documentName">
          {{ source.documentName }} (相似度: {{ (source.similarity * 100).toFixed(1) }}%)
        </li>
      </ul>
    </div>
  </div>
</div>
```

并更新发送方法以处理RAG信息:

```javascript
// 在 send() 方法中
if (data.success) {
  this.messages.push({ 
    role: 'ai', 
    text: data.message,
    ragInfo: data.ragInfo 
  })
}
```

### 阶段7：测试与优化 (30分钟)

#### 7.1 创建测试脚本
创建 `backend/test-rag.js`:

```javascript
// test-rag.js - RAG功能测试脚本
const ragService = require('./rag/services/ragService');
const vectorService = require('./rag/services/vectorService');

async function testRAG() {
  console.log('开始RAG功能测试...\n');
  
  try {
    // 1. 测试文档统计
    console.log('1. 测试文档统计:');
    const stats = await ragService.getDocumentStats();
    console.log('统计信息:', stats);
    console.log('');
    
    // 2. 测试检索功能
    console.log('2. 测试检索功能:');
    const testQueries = [
      '什么是非遗文化？',
      '数字博物馆有哪些展品？',
      '实践队的主要活动是什么？'
    ];
    
    for (const query of testQueries) {
      console.log(`查询: ${query}`);
      const results = await vectorService.searchSimilar(query, 2);
      console.log(`找到 ${results.length} 个相关结果:`);
      results.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.documentName} (相似度: ${(result.similarity * 100).toFixed(2)}%)`);
        console.log(`     内容预览: ${result.content.substring(0, 100)}...`);
      });
      console.log('');
    }
    
    // 3. 测试RAG增强
    console.log('3. 测试RAG增强:');
    const enhanceResult = await ragService.enhanceQuery('介绍一下非遗文化');
    console.log('原始查询: 介绍一下非遗文化');
    console.log('是否有上下文:', enhanceResult.context ? '是' : '否');
    console.log('参考源数量:', enhanceResult.sources.length);
    console.log('');
    
    console.log('RAG功能测试完成！');
    
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 运行测试
if (require.main === module) {
  testRAG().then(() => process.exit(0));
}

module.exports = { testRAG };
```

#### 7.2 性能监控
在 `backend/rag/services/vectorService.js` 中添加性能监控:

```javascript
// 在搜索方法中添加性能监控
async searchSimilar(query, limit = 5) {
  const startTime = Date.now();
  await this.initPromise;
  
  // ... 现有代码 ...
  
  const endTime = Date.now();
  console.log(`向量检索耗时: ${endTime - startTime}ms, 查询: "${query}"`);
  
  return results.slice(0, limit);
}
```

## 🚀 部署步骤

### 1. 环境变量配置
在 `backend/.env` 中添加:
```env
# RAG配置
RAG_ENABLED=true
MAX_UPLOAD_SIZE=10485760
VECTOR_DB_PATH=./vector-db/documents.db
```

### 2. 启动服务
```bash
# 后端
cd backend
npm run dev

# 前端
cd frontend  
npm run serve
```

### 3. 测试RAG功能
```bash
cd backend
node test-rag.js
```

## 📊 预期效果

1. **文档上传**: 用户可以上传docx文件，系统自动解析并向量化
2. **智能检索**: AI回答时会检索相关文档内容
3. **来源显示**: 前端显示回答的参考文档来源
4. **管理界面**: 提供文档管理和统计信息

## 🔧 后续优化建议

1. **支持更多格式**: PDF, TXT, MD等
2. **改进分块策略**: 基于语义的智能分块
3. **缓存机制**: 向量计算结果缓存
4. **用户权限**: 文档访问权限控制
5. **批量处理**: 支持批量文档上传

---

这个指南提供了完整的RAG功能实施路径。按照步骤执行，您将拥有一个功能完整的RAG增强AI助手！
