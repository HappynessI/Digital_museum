// routes/upload.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// 上传文档
router.post('/document', uploadController.uploadMiddleware, uploadController.uploadDocument);

// 获取文档列表
router.get('/documents', uploadController.listDocuments);

// 删除文档
router.delete('/document/:documentId', uploadController.deleteDocument);

module.exports = router;