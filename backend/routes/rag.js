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