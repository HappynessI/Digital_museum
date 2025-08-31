// services/llmService.js - LLM服务管理
const qwenProvider = require('../llm/providers/qwen');
const config = require('../config/llm');

class LLMService {
  constructor() {
    this.currentProvider = 'qwen'; // 默认使用通义千问
    this.providers = {
      qwen: qwenProvider
      // 未来可以添加其他LLM提供商
      // openai: openaiProvider,
      // claude: claudeProvider
    };
  }

  async generateResponse(message, history) {
    const provider = this.providers[this.currentProvider];
    
    if (!provider) {
      throw new Error(`LLM提供商 ${this.currentProvider} 不可用`);
    }

    try {
      const response = await provider.generateResponse(message, history);
      return response;
    } catch (error) {
      console.error(`LLM服务错误 (${this.currentProvider}):`, error);
      
      // 可以在这里实现提供商降级策略
      // if (this.currentProvider === 'qwen') {
      //   this.currentProvider = 'openai';
      //   return this.generateResponse(message, history);
      // }
      
      throw error;
    }
  }

  setProvider(providerName) {
    if (!this.providers[providerName]) {
      throw new Error(`不支持的LLM提供商: ${providerName}`);
    }
    this.currentProvider = providerName;
  }

  getAvailableProviders() {
    return Object.keys(this.providers);
  }
}

module.exports = new LLMService();
