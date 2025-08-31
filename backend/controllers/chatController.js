// controllers/chatController.js - 聊天控制器
const chatService = require('../services/chatService');

// 从环境变量读取RAG配置
const useRAG = process.env.RAG_ENABLED === 'true';

class ChatController {
  async handleChat(req, res) {
    try {
      const { message, history = [] } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({
          success: false,
          error: '消息内容不能为空'
        });
      }

      console.log('收到聊天请求:', { message, historyLength: history.length, useRAG });
      
      // 调用聊天服务
      const result = await chatService.processMessage(message, history);
      
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

  async getChatHistory(req, res) {
    try {
      // 这里可以实现获取聊天历史的逻辑
      res.json({
        success: true,
        history: []
      });
    } catch (error) {
      console.error('获取聊天历史错误:', error);
      res.status(500).json({
        success: false,
        error: '获取聊天历史失败'
      });
    }
  }

  async clearChatHistory(req, res) {
    try {
      // 这里可以实现清除聊天历史的逻辑
      res.json({
        success: true,
        message: '聊天历史已清除'
      });
    } catch (error) {
      console.error('清除聊天历史错误:', error);
      res.status(500).json({
        success: false,
        error: '清除聊天历史失败'
      });
    }
  }
}

module.exports = new ChatController();
