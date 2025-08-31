//rag/services/documentParser.js
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');

class DocumentParser {
    async parseDocx(filePath) {
      try {
        const result = await mammoth.extractRawText({ path: filePath });
        return {
          text: result.text,
          metadata: {
            fileName: path.basename(filePath),
            fileSize: (await fs.stat(filePath)).size,
            parseDate: new Date().toISOString()
          }
        };
      } catch (error) {
        throw new Error(`DOCX解析失败: ${error.message}`);
      }
    }

      // 将长文本分割成块
  chunkText(text, chunkSize = 500, overlap = 50) {
    const chunks = [];
    let start = 0;
    
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunk = text.slice(start, end);
      
      chunks.push({
        content: chunk.trim(),
        start,
        end,
        length: chunk.length
      });
      
      start = end - overlap;
    }
    
    return chunks;
  }
}

module.exports = new DocumentParser();