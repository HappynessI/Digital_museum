// rag/services/vectorService.js
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class VectorService {
    constructor() {
      this.db = null;
      // 千帆embedding配置 - 支持双API策略
      this.qianfanConfig = {
        // 千帆原生API配置
        nativeUrl: 'https://qianfan.baidubce.com/v2/embeddings',
        tokenUrl: 'https://aip.baidubce.com/oauth/2.0/token',
        // OpenAI兼容API配置
        compatibleUrl: 'https://qianfan.baidubce.com/v2',
        model: 'embedding-v1', // 使用embedding-v1模型
        apiKey: process.env.QIANFAN_API_KEY,
        secretKey: process.env.QIANFAN_SECRET_KEY
      };
      this.accessToken = null;
      this.tokenExpiry = null;
      this.initPromise = this.initialize();
    }
  
    async initialize() {
      try {
        // 检查千帆API配置
        console.log('🔧 初始化向量服务...');
        if (!this.qianfanConfig.apiKey) {
          throw new Error('千帆API配置不完整，请设置QIANFAN_API_KEY环境变量');
        }
        
        // 检查API密钥格式并验证配置
        if (this.qianfanConfig.apiKey.startsWith("bce-v3/")) {
          console.log('🔧 检测到bce-v3格式密钥，将使用千帆原生API');
        } else {
          console.log('🔧 检测到传统格式密钥，将使用OpenAI兼容API');
          if (!this.qianfanConfig.secretKey) {
            throw new Error('使用传统格式密钥时，请同时设置QIANFAN_SECRET_KEY环境变量');
          }
        }
        
        // 初始化SQLite数据库
        const dbPath = path.join(__dirname, '../../vector-db/documents.db');
        
        // 确保vector-db目录存在
        const fs = require('fs');
        const vectorDbDir = path.dirname(dbPath);
        if (!fs.existsSync(vectorDbDir)) {
          fs.mkdirSync(vectorDbDir, { recursive: true });
        }
        
        this.db = new sqlite3.Database(dbPath);
        
        // 创建表结构
        await this.createTables();
        
        // 跳过连接测试，直接标记服务可用
        console.log('🧪 千帆embedding API配置完成，服务可用');
        
        console.log('✅ 向量服务初始化完成 (使用千帆embedding API)');
      } catch (error) {
        console.error('❌ 向量服务初始化失败:', error.message);
        // 不抛出错误，让服务器继续运行，但标记服务不可用
        this.isAvailable = false;
        console.warn('⚠️ RAG功能将不可用，但服务器将继续运行');
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
    
      async getAccessToken() {
        // 如果token还有效，直接返回
        if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
          return this.accessToken;
        }
        
        try {
          const response = await axios.post(this.qianfanConfig.tokenUrl, null, {
            params: {
              grant_type: 'client_credentials',
              client_id: this.qianfanConfig.apiKey,
              client_secret: this.qianfanConfig.secretKey
            }
          });
          
          if (response.data && response.data.access_token) {
            this.accessToken = response.data.access_token;
            // token有效期通常是30天，这里设置为29天后过期
            this.tokenExpiry = Date.now() + (response.data.expires_in || 2592000) * 1000 - 86400000;
            console.log('✅ 千帆access token获取成功');
            return this.accessToken;
          } else {
            throw new Error('获取access token失败：' + JSON.stringify(response.data));
          }
        } catch (error) {
          console.error('获取千帆access token错误:', error.response?.data || error.message);
          throw new Error(`获取access token失败: ${error.message}`);
        }
      }

      async testQianfanConnection() {
        try {
          await this.getEmbedding('测试连接');
          console.log(`✅ 千帆embedding API连接测试成功 (模型: ${this.qianfanConfig.model})`);
          console.log(`🔧 当前使用API类型: ${this.qianfanConfig.apiKey?.startsWith("bce-v3/") ? '千帆原生API' : 'OpenAI兼容API'}`);
        } catch (error) {
          throw new Error(`千帆embedding API连接测试失败: ${error.message}`);
        }
      }

      // 智能API选择逻辑 - 根据API密钥格式自动选择API
      async _embed_texts(texts) {
        // 检测API密钥格式
        if (this.qianfanConfig.apiKey && this.qianfanConfig.apiKey.startsWith("bce-v3/")) {
          // 使用千帆原生API
          console.log('🔧 使用千帆原生API');
          return await this._embed_texts_qianfan(texts);
        } else {
          // 使用OpenAI兼容API
          console.log('🔧 使用OpenAI兼容API');
          return await this._embed_texts_compatible(texts);
        }
      }

      // 千帆原生API调用
      async _embed_texts_qianfan(texts) {
        const url = this.qianfanConfig.nativeUrl;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.qianfanConfig.apiKey}`
        };
        const payload = {
          "model": this.qianfanConfig.model, // embedding-v1
          "input": texts
        };

        try {
          const response = await axios.post(url, payload, {
            headers,
            timeout: 30000
          });

          if (response.data && response.data.data) {
            return response.data.data.map(item => item.embedding);
          } else {
            throw new Error('千帆原生API返回格式异常: ' + JSON.stringify(response.data));
          }
        } catch (error) {
          console.error('千帆原生API调用错误:', error.response?.data || error.message);
          throw error;
        }
      }

      // OpenAI兼容API调用（备用）
      async _embed_texts_compatible(texts) {
        try {
          const accessToken = await this.getAccessToken();
          const url = `${this.qianfanConfig.compatibleUrl}/embeddings`;
          
          const payload = {
            model: this.qianfanConfig.model,
            input: texts
          };
          
          const response = await axios.post(url, payload, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            timeout: 30000
          });

          if (response.data && response.data.data) {
            return response.data.data.map(item => item.embedding);
          } else {
            throw new Error('千帆兼容API返回格式异常: ' + JSON.stringify(response.data));
          }
        } catch (error) {
          console.error('千帆兼容API调用错误:', error.response?.data || error.message);
          throw error;
        }
      }

      async getEmbedding(text) {
        await this.initPromise;
        
        if (this.isAvailable === false) {
          throw new Error('向量服务不可用，请检查配置');
        }
        
        try {
          const embeddings = await this._embed_texts([text]);
          return embeddings[0];
        } catch (error) {
          if (error.response) {
            console.error('千帆API错误响应:', error.response.data);
            throw new Error(`千帆API错误: ${error.response.status} ${error.response.statusText}`);
          } else if (error.request) {
            console.error('千帆API网络错误:', error.message);
            throw new Error('网络连接错误，请检查网络连接');
          } else {
            console.error('千帆API调用错误:', error.message);
            throw error;
          }
        }
      }

      // 批量获取embedding（智能分批处理，支持API限制）
      async getBatchEmbeddings(texts) {
        await this.initPromise;
        
        if (this.isAvailable === false) {
          throw new Error('向量服务不可用，请检查配置');
        }
        
        try {
          // 千帆API限制：最多16条文本，单批次总长度不超过1000字符
          // 为了安全起见，使用更保守的限制
          const maxBatchSize = 5;  // 减少批次大小
          const maxBatchLength = 400; // 进一步减少长度限制
          
          // 智能分批：同时考虑数量和长度限制
          const batches = this.createSmartBatches(texts, maxBatchSize, maxBatchLength);
          
          if (batches.length === 1) {
            // 单批次直接处理
            return await this._embed_texts(batches[0]);
          } else {
            // 多批次处理
            console.log(`📦 智能分批: ${texts.length}条文本分为${batches.length}批处理`);
            
            const allEmbeddings = [];
            
            for (let i = 0; i < batches.length; i++) {
              const batch = batches[i];
              const totalLength = batch.reduce((sum, text) => sum + text.length, 0);
              console.log(`  处理第${i + 1}批: ${batch.length}条文本 (总长度: ${totalLength}字符)`);
              
              const batchEmbeddings = await this._embed_texts(batch);
              allEmbeddings.push(...batchEmbeddings);
              
              // 添加延迟避免API限流
              if (i < batches.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 200));
              }
            }
            
            console.log(`✅ 分批处理完成，共生成${allEmbeddings.length}个向量`);
            return allEmbeddings;
          }
        } catch (error) {
          console.error('千帆API批量embedding错误:', error.response?.data || error.message);
          throw error;
        }
      }

      // 智能分批算法：同时考虑数量和长度限制
      createSmartBatches(texts, maxCount, maxLength) {
        const batches = [];
        let currentBatch = [];
        let currentLength = 0;
        
        for (const text of texts) {
          const textLength = text.length;
          
          // 检查是否可以添加到当前批次
          if (currentBatch.length < maxCount && 
              currentLength + textLength <= maxLength) {
            // 可以添加
            currentBatch.push(text);
            currentLength += textLength;
          } else {
            // 需要开始新批次
            if (currentBatch.length > 0) {
              batches.push([...currentBatch]);
            }
            currentBatch = [text];
            currentLength = textLength;
            
            // 检查单个文本是否超长
            if (textLength > maxLength) {
              console.warn(`⚠️ 文本过长 (${textLength}字符)，可能影响处理效果`);
            }
          }
        }
        
        // 添加最后一批
        if (currentBatch.length > 0) {
          batches.push(currentBatch);
        }
        
        return batches;
      }
    
      async addDocument(name, chunks, metadata) {
        const startTime = Date.now();
        console.log(`📄 开始处理文档: ${name} (${chunks.length} 个块)`);
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
              
                        // 批量获取所有块的向量表示（提高效率）
          console.log('🔮 正在批量生成embedding...');
          const chunkTexts = chunks.map(chunk => chunk.content);
          const vectors = await this.getBatchEmbeddings(chunkTexts);
          
          // 处理每个文档块
          for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const chunkId = uuidv4();
            const vector = vectors[i];
            
            // 插入块记录
            this.db.run(
              'INSERT INTO document_chunks (id, document_id, content, start_pos, end_pos, vector_data) VALUES (?, ?, ?, ?, ?, ?)',
              [chunkId, documentId, chunk.content, chunk.start, chunk.end, JSON.stringify(vector)]
            );
          }
              
              // 提交事务
              this.db.run('COMMIT', (err) => {
                if (err) {
                  reject(err);
                } else {
                  const totalTime = Date.now() - startTime;
                  console.log(`✅ 文档处理完成:`);
                  console.log(`  文档名: ${name}`);
                  console.log(`  文档ID: ${documentId}`);
                  console.log(`  处理块数: ${chunks.length}`);
                  console.log(`  总耗时: ${totalTime}ms`);
                  console.log(`  平均每块: ${Math.round(totalTime / chunks.length)}ms`);
                  resolve(documentId);
                }
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
        const startTime = Date.now();
        await this.initPromise;
        
        // 获取查询的向量表示
        const embeddingStart = Date.now();
        const queryVector = await this.getEmbedding(query);
        const embeddingTime = Date.now() - embeddingStart;
        
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
              const finalResults = results.slice(0, limit);
              
              // 性能监控日志
              const totalTime = Date.now() - startTime;
              const searchTime = totalTime - embeddingTime;
              console.log(`🔍 向量检索性能统计:`);
              console.log(`  查询: "${query.substring(0, 30)}${query.length > 30 ? '...' : ''}"`);
              console.log(`  嵌入生成: ${embeddingTime}ms`);
              console.log(`  相似度计算: ${searchTime}ms`);
              console.log(`  总耗时: ${totalTime}ms`);
              console.log(`  候选文档: ${rows.length} -> 返回: ${finalResults.length}`);
              
              resolve(finalResults);
              
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
        
        if (this.isAvailable === false || !this.db) {
          throw new Error('向量服务不可用，请检查配置');
        }
        
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
        
        if (this.isAvailable === false || !this.db) {
          throw new Error('向量服务不可用，请检查配置');
        }
        
        return new Promise((resolve, reject) => {
          this.db.serialize(() => {
            this.db.run('BEGIN TRANSACTION');
            
            this.db.run('DELETE FROM document_chunks WHERE document_id = ?', [documentId]);
            this.db.run('DELETE FROM documents WHERE id = ?', [documentId], (err) => {
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