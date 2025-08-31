const multer = require('multer');
const path = require('path');
const documentParser = require('../rag/services/documentParser');
const vectorService = require('../rag/services/vectorService');

// 配置multer存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
      } else {
        cb(new Error('只支持.docx文件'), false);
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB限制
    }
  });
  
  class UploadController {
    constructor() {
      this.uploadMiddleware = upload.single('document');
    }
  
    async uploadDocument(req, res) {
      try {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            error: '请选择要上传的docx文件'
          });
        }
  
        console.log('开始处理文档:', req.file.originalname);
  
        // 解析文档
        const parsed = await documentParser.parseDocx(req.file.path);
        
        // 分块处理
        const chunks = documentParser.chunkText(parsed.text);
        
        // 向量化并存储
        const documentId = await vectorService.addDocument(
          req.file.originalname,
          chunks,
          parsed.metadata
        );
  
        res.json({
          success: true,
          message: '文档上传并处理成功',
          documentId,
          chunksCount: chunks.length,
          metadata: parsed.metadata
        });
  
      } catch (error) {
        console.error('文档上传处理错误:', error);
        res.status(500).json({
          success: false,
          error: error.message || '文档处理失败'
        });
      }
    }
  
    async listDocuments(req, res) {
      try {
        const documents = await vectorService.listDocuments();
        res.json({
          success: true,
          documents
        });
      } catch (error) {
        console.error('获取文档列表错误:', error);
        res.status(500).json({
          success: false,
          error: '获取文档列表失败'
        });
      }
    }
  
    async deleteDocument(req, res) {
      try {
        const { documentId } = req.params;
        await vectorService.deleteDocument(documentId);
        
        res.json({
          success: true,
          message: '文档删除成功'
        });
      } catch (error) {
        console.error('删除文档错误:', error);
        res.status(500).json({
          success: false,
          error: '删除文档失败'
        });
      }
    }
  }
  
  module.exports = new UploadController();