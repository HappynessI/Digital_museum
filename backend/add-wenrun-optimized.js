// add-wenrun-optimized.js - 优化的文润文档添加脚本
require('dotenv').config();
const fs = require('fs');
const vectorService = require('./rag/services/vectorService');

async function addWenrunOptimized() {
  console.log('📄 优化添加文润.docx到知识库');
  console.log('==============================\n');
  
  try {
    // 等待向量服务初始化
    await vectorService.initPromise;
    console.log('✅ 向量服务就绪\n');
    
    // 使用之前提取的结构化内容
    const extractedFile = './extracted-structured-content.txt';
    
    if (!fs.existsSync(extractedFile)) {
      throw new Error('未找到提取的内容文件，请先运行文档解析');
    }
    
    const fullText = fs.readFileSync(extractedFile, 'utf8');
    console.log(`📊 原始内容: ${fullText.length}字符\n`);
    
    // 智能分块 - 严格控制在800字符以内
    const chunks = smartChunk(fullText, 800);
    console.log(`📦 分块完成: ${chunks.length}个块\n`);
    
    // 显示分块统计
    const lengths = chunks.map(c => c.content.length);
    const avgLength = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
    const maxLength = Math.max(...lengths);
    const oversized = chunks.filter(c => c.content.length > 1000);
    
    console.log(`📊 分块统计:`);
    console.log(`  平均长度: ${avgLength}字符`);
    console.log(`  最大长度: ${maxLength}字符`);
    console.log(`  超过1000字符的块: ${oversized.length}个\n`);
    
    if (oversized.length > 0) {
      console.log('⚠️ 发现超长块，将进一步分割...');
      // 重新分割超长块
      const finalChunks = [];
      for (const chunk of chunks) {
        if (chunk.content.length <= 1000) {
          finalChunks.push(chunk);
        } else {
          const subChunks = splitLongText(chunk.content, 800);
          subChunks.forEach((subContent, index) => {
            finalChunks.push({
              content: subContent,
              start: chunk.start,
              end: chunk.end,
              type: chunk.type || '正文'
            });
          });
        }
      }
      chunks.splice(0, chunks.length, ...finalChunks);
      console.log(`✅ 重新分块后: ${chunks.length}个块\n`);
    }
    
    // 批量添加到知识库
    console.log('🔮 开始向量化并添加到知识库...');
    const startTime = Date.now();
    
    const documentId = await vectorService.addDocument(
      '文润经心项目完整文档',
      chunks,
      {
        source: 'rag_test_doc',
        originalFile: 'rag_test_doc/文润.docx',
        originalSize: fs.statSync('./rag_test_doc/文润.docx').size,
        extractedSize: fullText.length,
        chunkCount: chunks.length,
        addedTime: new Date().toISOString(),
        description: '文润经心项目完整文档，包含项目背景、调研成果、创新方法等全部内容'
      }
    );
    
    const totalTime = Date.now() - startTime;
    
    console.log('🎉 文档成功添加到知识库！');
    console.log(`📊 处理统计:`);
    console.log(`  文档ID: ${documentId}`);
    console.log(`  原始文件: ${(fs.statSync('./rag_test_doc/文润.docx').size / (1024*1024)).toFixed(2)}MB`);
    console.log(`  提取内容: ${fullText.length}字符`);
    console.log(`  文档块数: ${chunks.length}个`);
    console.log(`  处理耗时: ${totalTime}ms\n`);
    
    // 验证知识库状态
    console.log('📊 验证知识库状态:');
    const ragService = require('./rag/services/ragService');
    const stats = await ragService.getDocumentStats();
    console.log(`  总文档数: ${stats.totalDocuments}个`);
    console.log(`  总文档块数: ${stats.totalChunks}个\n`);
    
    // 测试检索功能
    console.log('🔍 测试知识库检索功能...');
    const testQueries = [
      '文润经心项目是什么？',
      '山东非遗有哪些特色？',
      '非遗传承面临什么困难？',
      '实践队的创新方法有哪些？'
    ];
    
    for (const query of testQueries) {
      console.log(`\n  查询: "${query}"`);
      try {
        const results = await vectorService.searchSimilar(query, 2);
        if (results.length > 0) {
          results.forEach((result, index) => {
            console.log(`    ${index + 1}. [${result.similarity.toFixed(4)}] ${result.content.substring(0, 60)}...`);
          });
        } else {
          console.log('    未找到相关内容');
        }
      } catch (error) {
        console.log(`    检索错误: ${error.message}`);
      }
    }
    
    console.log('\n✨ 文润.docx完整内容已成功添加到知识库！');
    console.log('🚀 RAG功能现在可以基于完整的项目文档进行智能问答');
    
  } catch (error) {
    console.error('❌ 添加文档失败:', error.message);
    process.exit(1);
  }
}

// 智能分块函数
function smartChunk(text, maxSize) {
  const chunks = [];
  const paragraphs = text.split(/\n\s*\n/); // 按段落分割
  
  let currentChunk = '';
  let chunkStart = 0;
  let currentPos = 0;
  
  for (const paragraph of paragraphs) {
    const paragraphLength = paragraph.length;
    
    // 如果当前块加上新段落超过限制
    if (currentChunk.length + paragraphLength + 2 > maxSize && currentChunk.length > 0) {
      // 保存当前块
      chunks.push({
        content: currentChunk.trim(),
        start: chunkStart,
        end: currentPos,
        type: detectContentType(currentChunk)
      });
      
      // 开始新块
      currentChunk = paragraph;
      chunkStart = currentPos;
    } else {
      // 添加到当前块
      if (currentChunk.length > 0) {
        currentChunk += '\n\n' + paragraph;
      } else {
        currentChunk = paragraph;
      }
    }
    
    currentPos += paragraphLength + 2;
  }
  
  // 添加最后一块
  if (currentChunk.trim().length > 0) {
    chunks.push({
      content: currentChunk.trim(),
      start: chunkStart,
      end: currentPos,
      type: detectContentType(currentChunk)
    });
  }
  
  return chunks;
}

// 分割超长文本
function splitLongText(text, maxSize) {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    let end = Math.min(start + maxSize, text.length);
    
    // 寻找合适的断点
    if (end < text.length) {
      for (let i = end; i > start + maxSize * 0.8; i--) {
        if (text[i] === '。' || text[i] === '\n' || text[i] === '！' || text[i] === '？') {
          end = i + 1;
          break;
        }
      }
    }
    
    const chunk = text.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    
    start = end;
  }
  
  return chunks;
}

// 检测内容类型
function detectContentType(content) {
  if (content.includes('【表格')) {
    return '表格';
  } else if (content.includes('[图片:')) {
    return '图片说明';
  } else if (content.match(/^=+\s.*\s=+$/m)) {
    return '标题段落';
  } else {
    return '正文';
  }
}

// 执行添加操作
addWenrunOptimized();

