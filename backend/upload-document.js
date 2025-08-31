// upload-document.js - 文档上传到知识库的脚本
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const vectorService = require('./rag/services/vectorService');
const documentParser = require('./rag/services/documentParser');

async function uploadDocument(filePath) {
  console.log('📄 开始上传文档到知识库...\n');
  
  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      throw new Error(`文件不存在: ${filePath}`);
    }
    
    const fileName = path.basename(filePath);
    const fileSize = fs.statSync(filePath).size;
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    
    console.log(`📋 文件信息:`);
    console.log(`  文件名: ${fileName}`);
    console.log(`  文件大小: ${fileSizeMB}MB`);
    console.log(`  文件路径: ${filePath}\n`);
    
    // 等待向量服务初始化
    console.log('🔧 等待向量服务初始化...');
    await vectorService.initPromise;
    console.log('✅ 向量服务就绪\n');
    
    // 解析文档
    console.log('📖 开始解析文档...');
    const parseStartTime = Date.now();
    
    // 读取文件
    const fileBuffer = fs.readFileSync(filePath);
    
    // 解析DOCX文档内容
    console.log('🔍 正在解析DOCX文件...');
    const parsedResult = await documentParser.parseDocx(filePath);
    console.log(`📝 提取文本长度: ${parsedResult.text ? parsedResult.text.length : 0}字符`);
    
    if (!parsedResult.text || parsedResult.text.length === 0) {
      throw new Error('文档解析失败：未能提取到文本内容');
    }
    
    // 将文本分块
    console.log('✂️ 正在分割文本块...');
    const chunks = documentParser.chunkText(parsedResult.text);
    console.log(`📦 生成文本块: ${chunks.length}个`);
    
    const parsedContent = {
      text: parsedResult.text,
      chunks: chunks,
      metadata: parsedResult.metadata
    };
    const parseTime = Date.now() - parseStartTime;
    
    console.log(`✅ 文档解析完成:`);
    console.log(`  解析耗时: ${parseTime}ms`);
    console.log(`  提取文本长度: ${parsedContent.text.length}字符`);
    console.log(`  分块数量: ${parsedContent.chunks.length}块`);
    console.log(`  平均块大小: ${Math.round(parsedContent.text.length / parsedContent.chunks.length)}字符/块\n`);
    
    // 显示前几个块的预览
    console.log('📋 文档块预览 (前3个):');
    parsedContent.chunks.slice(0, 3).forEach((chunk, index) => {
      console.log(`  块${index + 1}: ${chunk.content.substring(0, 100)}...`);
    });
    console.log('');
    
    // 添加到向量数据库
    console.log('🔮 开始向量化并存储到知识库...');
    const uploadStartTime = Date.now();
    
    const documentId = await vectorService.addDocument(
      fileName,
      parsedContent.chunks,
      {
        originalSize: fileSize,
        uploadTime: new Date().toISOString(),
        textLength: parsedContent.text.length,
        chunkCount: parsedContent.chunks.length,
        source: 'manual_upload'
      }
    );
    
    const uploadTime = Date.now() - uploadStartTime;
    const totalTime = Date.now() - parseStartTime;
    
    console.log('🎉 文档上传成功！');
    console.log(`📊 处理统计:`);
    console.log(`  文档ID: ${documentId}`);
    console.log(`  向量化耗时: ${uploadTime}ms`);
    console.log(`  总处理耗时: ${totalTime}ms`);
    console.log(`  平均处理速度: ${Math.round(parsedContent.chunks.length / (totalTime / 1000))}块/秒\n`);
    
    // 测试检索功能
    console.log('🔍 测试知识库检索功能...');
    const testQueries = [
      '文润经心是什么？',
      '实践队的主要工作',
      '数字博物馆的特色'
    ];
    
    for (const query of testQueries) {
      console.log(`\n  查询: "${query}"`);
      const results = await vectorService.searchSimilar(query, 2);
      if (results.length > 0) {
        results.forEach((result, index) => {
          console.log(`    ${index + 1}. [相似度: ${result.similarity.toFixed(4)}] ${result.content.substring(0, 80)}...`);
        });
      } else {
        console.log('    未找到相关内容');
      }
    }
    
    console.log('\n✨ 文档已成功添加到知识库，可以开始使用RAG功能！');
    
  } catch (error) {
    console.error('❌ 文档上传失败:', error.message);
    console.error('\n🔧 可能的解决方案:');
    console.error('  1. 检查文件路径是否正确');
    console.error('  2. 确保文件格式为DOCX');
    console.error('  3. 检查网络连接和API配置');
    console.error('  4. 确认文件大小不超过限制');
    process.exit(1);
  }
}

// 获取命令行参数
const filePath = process.argv[2];

if (!filePath) {
  console.log('📋 使用方法:');
  console.log('  node upload-document.js <文件路径>');
  console.log('\n📋 示例:');
  console.log('  node upload-document.js ./rag_test_doc/文润.docx');
  process.exit(1);
}

// 执行上传
uploadDocument(filePath);
