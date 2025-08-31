// llm/providers/qwen.js - 通义千问提供商
const axios = require('axios');
const config = require('../../config/llm');

class QwenProvider {
  constructor() {
    this.name = 'qwen';
    this.endpoint = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    this.model = 'qwen-plus';
  }

  async generateResponse(message, history) {
    // 检查API密钥
    const apiKey = process.env.QWEN_API_KEY;
    console.log('API Key 状态:', apiKey ? '已加载' : '未加载');
    console.log('API Key 前缀:', apiKey ? apiKey.substring(0, 10) + '...' : 'undefined');
    
    if (!apiKey) {
      throw new Error('QWEN_API_KEY 环境变量未设置');
    }

    // 构建对话历史，转换为OpenAI兼容格式
    const messages = [
      {
        role: "system",
        content: config.systemPrompt
      },
      // 转换历史消息格式
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text || msg.content
      })),
      {
        role: "user", 
        content: message
      }
    ];

    console.log('发送到通义千问的消息:', JSON.stringify(messages, null, 2));

    try {
      const response = await axios.post(this.endpoint, {
        model: this.model,
        messages: messages,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        stream: false
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: config.timeout
      });

      console.log('通义千问API响应:', response.data);

      if (!response.data.choices || !response.data.choices[0] || !response.data.choices[0].message) {
        throw new Error('通义千问API响应格式错误');
      }

      // OpenAI兼容格式的响应
      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response) {
        console.error('通义千问API错误响应:', error.response.data);
        throw new Error(`通义千问API错误: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        console.error('通义千问API网络错误:', error.message);
        throw new Error('网络连接错误，请检查网络连接');
      } else {
        console.error('通义千问API调用错误:', error.message);
        throw error;
      }
    }
  }

  async testConnection() {
    try {
      await this.generateResponse('你好', []);
      return { success: true, message: '通义千问连接正常' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = new QwenProvider();
