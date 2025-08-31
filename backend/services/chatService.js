// services/chatService.js - 聊天业务服务
const llmService = require('./llmService');
const ragService = require('../rag/services/ragService');


class ChatService {
  async processMessage(message, history) {
    try {
      // 预处理消息
      const processedMessage = this.preprocessMessage(message);
      
      // 过滤和验证历史记录
      const validHistory = this.validateHistory(history);
      
      let finalMessage = processedMessage;
      let ragInfo = null;
      
      // 如果启用RAG，增强查询
      const useRAG = process.env.RAG_ENABLED === 'true';
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
      
      // 返回完整的结果对象
      return {
        message: processedResponse,
        ragInfo: ragInfo
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
