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