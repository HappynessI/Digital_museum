// routes/chat.js - 聊天路由
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// AI聊天接口
router.post('/chat', chatController.handleChat);

// 获取聊天历史
router.get('/chat/history', chatController.getChatHistory);

// 清除聊天历史
router.delete('/chat/history', chatController.clearChatHistory);

module.exports = router;
