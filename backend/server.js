// 首先加载环境变量（必须在其他模块之前）
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();

// 中间件
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API路由
app.use('/api', chatRoutes);

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API接口不存在'
  });
});

// 全局错误处理
app.use((error, req, res, next) => {
  console.error('全局错误处理:', error);
  res.status(500).json({
    success: false,
    error: '服务器内部错误'
  });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Digital Museum Backend Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Chat API: http://localhost:${PORT}/api/chat`);
});

//RAG相关
app.use('/api/upload', require('./routes/upload'));
app.use('/api/rag', require('./routes/rag'));

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('🔄 收到SIGTERM信号，开始优雅关闭...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

module.exports = app;