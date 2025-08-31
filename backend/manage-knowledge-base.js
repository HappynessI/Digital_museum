// manage-knowledge-base.js - 知识库管理脚本
require('dotenv').config();
const vectorService = require('./rag/services/vectorService');
const ragService = require('./rag/services/ragService');

async function manageKnowledgeBase() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('📋 知识库管理工具');
    console.log('');
    console.log('使用方法:');
    console.log('  node manage-knowledge-base.js <命令>');
    console.log('');
    console.log('可用命令:');
    console.log('  stats     - 查看知识库统计信息');
    console.log('  list      - 列出所有文档');
    console.log('  search    - 搜索文档 (需要提供查询词)');
    console.log('  clear     - 清空知识库 (谨慎使用!)');
    console.log('');
    console.log('示例:');
    console.log('  node manage-knowledge-base.js stats');
    console.log('  node manage-knowledge-base.js search "数字博物馆"');
    console.log('  node manage-knowledge-base.js clear');
    return;
  }

  try {
    // 等待向量服务初始化
    await vectorService.initPromise;
    console.log('✅ 向量服务就绪\n');

    switch (command) {
      case 'stats':
        await showStats();
        break;
      case 'list':
        await listDocuments();
        break;
      case 'search':
        const query = process.argv[3];
        if (!query) {
          console.log('❌ 请提供搜索查询词');
          console.log('示例: node manage-knowledge-base.js search "数字博物馆"');
          return;
        }
        await searchDocuments(query);
        break;
      case 'clear':
        await clearKnowledgeBase();
        break;
      default:
        console.log(`❌ 未知命令: ${command}`);
        console.log('运行 node manage-knowledge-base.js 查看可用命令');
    }
  } catch (error) {
    console.error('❌ 操作失败:', error.message);
    process.exit(1);
  }
}

async function showStats() {
  console.log('📊 知识库统计信息:');
  const stats = await ragService.getDocumentStats();
  
  console.log(`  总文档数: ${stats.totalDocuments}`);
  console.log(`  总文档块数: ${stats.totalChunks}`);
  console.log('');
  
  if (stats.documents.length > 0) {
    console.log('📋 文档列表:');
    stats.documents.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.name} (${doc.chunksCount}块)`);
      console.log(`     创建时间: ${new Date(doc.createdAt).toLocaleString()}`);
    });
  } else {
    console.log('📋 知识库为空');
  }
}

async function listDocuments() {
  console.log('📋 文档详细列表:');
  const documents = await vectorService.listDocuments();
  
  if (documents.length === 0) {
    console.log('  知识库为空');
    return;
  }
  
  documents.forEach((doc, index) => {
    console.log(`\n${index + 1}. ${doc.name}`);
    console.log(`   ID: ${doc.id}`);
    console.log(`   块数: ${doc.chunks_count}`);
    console.log(`   创建时间: ${new Date(doc.created_at).toLocaleString()}`);
    
    if (doc.metadata) {
      const meta = JSON.parse(doc.metadata);
      if (meta.source) console.log(`   来源: ${meta.source}`);
      if (meta.type) console.log(`   类型: ${meta.type}`);
    }
  });
}

async function searchDocuments(query) {
  console.log(`🔍 搜索: "${query}"`);
  console.log('');
  
  const results = await vectorService.searchSimilar(query, 5);
  
  if (results.length === 0) {
    console.log('  未找到相关内容');
    return;
  }
  
  console.log(`📋 搜索结果 (${results.length}条):`);
  results.forEach((result, index) => {
    console.log(`\n  ${index + 1}. [相似度: ${result.similarity.toFixed(4)}]`);
    console.log(`     文档: ${result.documentName}`);
    console.log(`     内容: ${result.content.substring(0, 100)}${result.content.length > 100 ? '...' : ''}`);
  });
}

async function clearKnowledgeBase() {
  console.log('⚠️  即将清空整个知识库！');
  console.log('这将删除所有文档和向量数据，此操作不可恢复。');
  
  // 在实际环境中，这里应该添加确认提示
  // 为了演示，我们直接执行
  const documents = await vectorService.listDocuments();
  
  if (documents.length === 0) {
    console.log('✅ 知识库已经为空');
    return;
  }
  
  console.log(`\n🗑️  开始删除 ${documents.length} 个文档...`);
  
  for (const doc of documents) {
    await vectorService.deleteDocument(doc.id);
    console.log(`  ✅ 已删除: ${doc.name}`);
  }
  
  console.log('\n🎉 知识库已清空完成');
  
  // 验证清空结果
  const finalStats = await ragService.getDocumentStats();
  console.log(`📊 最终统计: ${finalStats.totalDocuments}个文档，${finalStats.totalChunks}个文档块`);
}

// 执行管理命令
manageKnowledgeBase();
