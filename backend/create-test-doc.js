// create-test-doc.js - 创建测试文档
require('dotenv').config();
const vectorService = require('./rag/services/vectorService');

async function createTestDocument() {
  console.log('📄 创建测试文档并添加到知识库...\n');
  
  try {
    // 等待向量服务初始化
    await vectorService.initPromise;
    console.log('✅ 向量服务就绪\n');
    
    // 创建测试文档内容
    const testDocument = {
      name: '溯本求源·文润经心数字博物馆介绍.txt',
      chunks: [
        {
          content: '溯本求源·文润经心数字博物馆是由天津大学管理与经济学部实践队开发的智能化数字博物馆平台。该项目采用先进的AI技术，为用户提供沉浸式的非遗文化体验，结合现代化的大语言模型、RAG检索增强生成技术和智能文档处理能力。',
          start: 0,
          end: 120
        },
        {
          content: '数字博物馆的核心特色包括：智能AI导览助手、非物质文化遗产展示、实践队调研成果展示、农业非遗特展等功能模块。通过现代科技手段，让传统文化在新时代焕发新的生机与活力。',
          start: 121,
          end: 200
        },
        {
          content: '天津大学实践队通过实地调研，深入了解非遗项目的传承现状，收集整理了大量珍贵的文化资料。实践队致力于通过数字化手段保护和传承非物质文化遗产，让更多人了解和关注传统文化。',
          start: 201,
          end: 290
        },
        {
          content: '项目技术架构采用微服务设计，包括前端Vue.js应用、后端Node.js服务、AI大语言模型集成、RAG向量检索系统等。使用百度千帆embedding-v1模型进行文本向量化，实现智能的语义检索功能。',
          start: 291,
          end: 390
        },
        {
          content: '非物质文化遗产是人类文明的重要组成部分，承载着丰富的历史文化信息。数字博物馆通过AI技术，能够为访客提供个性化的导览服务，回答关于非遗文化的各种问题，促进文化传承与传播。',
          start: 391,
          end: 480
        }
      ],
      metadata: {
        source: 'manual_create',
        type: 'text',
        createTime: new Date().toISOString(),
        description: '数字博物馆测试文档'
      }
    };
    
    console.log(`📋 测试文档信息:`);
    console.log(`  文档名: ${testDocument.name}`);
    console.log(`  文档块数: ${testDocument.chunks.length}`);
    console.log(`  总文本长度: ${testDocument.chunks.reduce((sum, chunk) => sum + chunk.content.length, 0)}字符\n`);
    
    // 显示文档内容预览
    console.log('📋 文档内容预览:');
    testDocument.chunks.forEach((chunk, index) => {
      console.log(`  块${index + 1}: ${chunk.content.substring(0, 50)}...`);
    });
    console.log('');
    
    // 添加到向量数据库
    console.log('🔮 开始向量化并存储到知识库...');
    const startTime = Date.now();
    
    const documentId = await vectorService.addDocument(
      testDocument.name,
      testDocument.chunks,
      testDocument.metadata
    );
    
    const totalTime = Date.now() - startTime;
    
    console.log('🎉 测试文档添加成功！');
    console.log(`📊 处理统计:`);
    console.log(`  文档ID: ${documentId}`);
    console.log(`  总处理耗时: ${totalTime}ms\n`);
    
    // 测试检索功能
    console.log('🔍 测试知识库检索功能...');
    const testQueries = [
      '什么是溯本求源文润经心？',
      '数字博物馆有什么特色功能？',
      '实践队做了哪些工作？',
      '项目使用了什么技术？',
      '非遗文化的意义是什么？'
    ];
    
    for (const query of testQueries) {
      console.log(`\n  查询: "${query}"`);
      const results = await vectorService.searchSimilar(query, 2);
      if (results.length > 0) {
        results.forEach((result, index) => {
          console.log(`    ${index + 1}. [相似度: ${result.similarity.toFixed(4)}] ${result.content.substring(0, 60)}...`);
        });
      } else {
        console.log('    未找到相关内容');
      }
    }
    
    console.log('\n✨ 测试文档已成功添加到知识库！');
    console.log('🚀 现在可以通过聊天接口使用RAG功能了');
    
    // 显示知识库统计
    const ragService = require('./rag/services/ragService');
    const stats = await ragService.getDocumentStats();
    console.log(`\n📊 当前知识库统计:`);
    console.log(`  总文档数: ${stats.totalDocuments}`);
    console.log(`  总文档块数: ${stats.totalChunks}`);
    
  } catch (error) {
    console.error('❌ 测试文档创建失败:', error.message);
    process.exit(1);
  }
}

// 执行创建测试文档
createTestDocument();
