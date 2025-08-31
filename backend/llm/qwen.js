// backend/llm/qwen.js
const axios = require('axios');

async function callQwen(message, history) {
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
      content: "你是'溯本求源·文润经心'数字博物馆的AI助手，专门帮助用户了解非遗文化、实践队活动和博物馆展品。请用友好、专业的语气回答用户问题。"
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

  const response = await axios.post('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    model: 'qwen-plus',  // 使用qwen-plus模型
    messages: messages,
    max_tokens: 500,
    temperature: 0.7,
    stream: false
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('通义千问API响应:', response.data);

  // OpenAI兼容格式的响应
  return response.data.choices[0].message.content;
}

module.exports = { callQwen };