// rag/services/ragService.js
const vectorService = require('./vectorService');

class RAGService {
  async enhanceQuery(message, history = []) {
    const startTime = Date.now();
    console.log(`🔮 RAG增强查询: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);
    
    try {
      // 检索相关文档片段
      const searchStart = Date.now();
      const relevantChunks = await vectorService.searchSimilar(message, 3);
      const searchTime = Date.now() - searchStart;
      
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

      const result = {
        enhancedMessage,
        context,
        sources: relevantChunks.map(chunk => ({
          documentName: chunk.documentName,
          similarity: chunk.similarity,
          preview: chunk.content.substring(0, 100) + '...'
        }))
      };
      
      // 性能监控日志
      const totalTime = Date.now() - startTime;
      const enhanceTime = totalTime - searchTime;
      console.log(`✨ RAG增强完成:`);
      console.log(`  检索耗时: ${searchTime}ms`);
      console.log(`  增强耗时: ${enhanceTime}ms`);
      console.log(`  总耗时: ${totalTime}ms`);
      console.log(`  找到源: ${relevantChunks.length} 个`);
      console.log(`  上下文长度: ${context ? context.length : 0} 字符`);
      
      return result;
      
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