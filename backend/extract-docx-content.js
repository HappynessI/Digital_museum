// extract-docx-content.js - 增强的DOCX内容提取工具
const fs = require('fs');
const mammoth = require('mammoth');

async function extractDocxContent(filePath) {
  console.log('🔧 尝试多种方式提取DOCX内容...\n');
  
  try {
    // 方法1: 标准文本提取
    console.log('📋 方法1: 标准文本提取');
    const result1 = await mammoth.extractRawText({ path: filePath });
    console.log(`   提取长度: ${result1.text ? result1.text.length : 0}字符`);
    
    if (result1.text && result1.text.length > 0) {
      console.log('✅ 标准方法成功!');
      return result1.text;
    }
    
    // 方法2: HTML提取后转文本
    console.log('\n📋 方法2: HTML格式提取');
    const result2 = await mammoth.convertToHtml({ path: filePath });
    console.log(`   HTML长度: ${result2.value ? result2.value.length : 0}字符`);
    
    if (result2.value && result2.value.length > 0) {
      // 简单清理HTML标签
      const textFromHtml = result2.value
        .replace(/<[^>]*>/g, ' ')  // 移除HTML标签
        .replace(/&nbsp;/g, ' ')   // 替换HTML实体
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')      // 合并多个空格
        .trim();
      
      console.log(`   转换后文本长度: ${textFromHtml.length}字符`);
      
      if (textFromHtml.length > 0) {
        console.log('✅ HTML方法成功!');
        console.log(`📋 内容预览: "${textFromHtml.substring(0, 200)}..."`);
        return textFromHtml;
      }
    }
    
    // 方法3: 显示解析消息
    console.log('\n📋 方法3: 检查解析警告和消息');
    if (result1.messages && result1.messages.length > 0) {
      console.log('解析消息:');
      result1.messages.forEach((msg, index) => {
        console.log(`   ${index + 1}. [${msg.type}] ${msg.message}`);
      });
    }
    
    if (result2.messages && result2.messages.length > 0) {
      console.log('HTML转换消息:');
      result2.messages.forEach((msg, index) => {
        console.log(`   ${index + 1}. [${msg.type}] ${msg.message}`);
      });
    }
    
    console.log('\n❌ 所有方法都无法提取到文本内容');
    console.log('\n🔍 可能的原因:');
    console.log('   1. 文档主要包含图片、图表或扫描件');
    console.log('   2. 文本在复杂的表格或文本框中');
    console.log('   3. 文档使用了不兼容的格式或加密');
    console.log('   4. 文档损坏或格式异常');
    
    return null;
    
  } catch (error) {
    console.error('❌ 提取过程出错:', error.message);
    return null;
  }
}

async function createManualContent() {
  console.log('\n💡 创建手动测试内容...');
  
  // 基于"文润经心"主题创建测试内容
  const manualContent = `
溯本求源·文润经心数字博物馆项目介绍

一、项目背景
"溯本求源·文润经心"数字博物馆是天津大学管理与经济学部实践队的重要项目成果。该项目致力于通过数字化技术手段，保护和传承中华优秀传统文化，特别是非物质文化遗产。

二、项目目标
1. 构建智能化的数字博物馆平台
2. 运用AI技术提供个性化文化体验
3. 促进非遗文化的传承与传播
4. 打造文化教育与科技创新的结合典范

三、核心功能
1. 智能AI导览助手
   - 基于大语言模型的智能问答
   - 个性化推荐和导览路线
   - 多语言支持和无障碍访问

2. 非遗文化展示
   - 丰富的多媒体展示内容
   - 沉浸式的虚拟展览体验
   - 详细的文化背景介绍

3. 实践队成果展示
   - 实地调研的珍贵资料
   - 文化传承人访谈记录
   - 项目实施过程记录

4. 教育互动功能
   - 在线学习课程
   - 互动体验游戏
   - 文化知识竞赛

四、技术架构
1. 前端技术：Vue.js框架，响应式设计
2. 后端技术：Node.js服务器，RESTful API
3. AI技术：集成大语言模型和向量检索
4. 数据库：SQLite轻量级数据库
5. 部署：Docker容器化部署

五、项目价值
1. 文化价值：保护和传承非物质文化遗产
2. 教育价值：提供优质的文化教育资源
3. 技术价值：探索AI在文化领域的应用
4. 社会价值：促进文化自信和民族认同

六、未来展望
项目将继续完善功能，扩大覆盖范围，努力成为文化数字化的标杆项目，为中华文化的传承发展贡献力量。

结语：
"溯本求源·文润经心"不仅是一个技术项目，更是一个文化使命。我们希望通过数字技术的力量，让传统文化在新时代焕发新的生机与活力。
`.trim();

  return manualContent;
}

async function main() {
  const filePath = './rag_test_doc/文润.docx';
  
  // 尝试提取原文档内容
  const extractedContent = await extractDocxContent(filePath);
  
  let finalContent;
  
  if (extractedContent && extractedContent.length > 0) {
    finalContent = extractedContent;
    console.log('\n✅ 使用提取的文档内容');
  } else {
    finalContent = await createManualContent();
    console.log('\n💡 使用手动创建的测试内容');
  }
  
  // 保存为文本文件
  const outputPath = './extracted-content.txt';
  fs.writeFileSync(outputPath, finalContent, 'utf8');
  
  console.log(`\n💾 内容已保存到: ${outputPath}`);
  console.log(`📊 内容长度: ${finalContent.length}字符`);
  console.log(`📋 内容预览: "${finalContent.substring(0, 200)}..."`);
  
  // 创建知识库文档
  console.log('\n🔮 创建知识库文档...');
  
  const vectorService = require('./rag/services/vectorService');
  const documentParser = require('./rag/services/documentParser');
  
  try {
    await vectorService.initPromise;
    
    // 分块处理
    const chunks = documentParser.chunkText(finalContent);
    console.log(`📦 生成文档块: ${chunks.length}个`);
    
    // 添加到知识库
    const documentId = await vectorService.addDocument(
      '文润经心项目介绍.txt',
      chunks,
      {
        source: 'manual_extraction',
        originalFile: '文润.docx',
        extractionMethod: extractedContent ? 'automated' : 'manual',
        createTime: new Date().toISOString()
      }
    );
    
    console.log(`🎉 文档已添加到知识库! ID: ${documentId}`);
    
    // 测试检索
    console.log('\n🔍 测试检索功能...');
    const testQuery = '文润经心项目的核心功能';
    const results = await vectorService.searchSimilar(testQuery, 3);
    
    console.log(`查询: "${testQuery}"`);
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. [${result.similarity.toFixed(4)}] ${result.content.substring(0, 60)}...`);
    });
    
  } catch (error) {
    console.error('❌ 知识库操作失败:', error.message);
  }
}

main();
