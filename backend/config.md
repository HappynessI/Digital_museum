# 环境变量配置说明

请在 `backend` 文件夹下创建 `.env` 文件，内容如下：

```env
# 通义千问API配置
QWEN_API_KEY=sk-08daee7bef824a6eb7d26562ae34c334

# 千帆embedding API配置（支持双API策略）
# 方式1：使用bce-v3格式密钥（推荐，使用千帆原生API）
QIANFAN_API_KEY=bce-v3/ALTAK-TRIiL81n07THTOvLoTphw/b3f4cb9f060058187b33f8509d92560e04dd8dd3
# 方式2：使用传统格式（使用OpenAI兼容API）
# QIANFAN_API_KEY=your_api_key_here
# QIANFAN_SECRET_KEY=your_secret_key_here

# 服务器配置
PORT=3001
NODE_ENV=development

# CORS配置（前端地址）
FRONTEND_URL=http://localhost:8080
```

## 启动服务

```bash
# 进入后端目录
cd backend

# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev
```

## 测试API

```bash
# 测试聊天接口
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "你好，请介绍一下这个数字博物馆"}'
```

## API配置说明

### LLM配置
- **Endpoint**: `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`
- **模型**: `qwen-plus`
- **API密钥**: `sk-08daee7bef824a6eb7d26562ae34c334`
- **格式**: OpenAI兼容格式

### Embedding配置（智能双API策略）
- **模型**: `embedding-v1`
- **服务提供商**: 百度千帆平台

#### 当前使用：千帆原生API
- **API端点**: `https://qianfan.baidubce.com/v2/embeddings`
- **认证方式**: Bearer Token (bce-v3格式密钥)
- **密钥格式**: `bce-v3/ALTAK-TRIiL81n07THTOvLoTphw/b3f4cb9f060058187b33f8509d92560e04dd8dd3`

#### 备用：OpenAI兼容API
- **API端点**: `https://qianfan.baidubce.com/v2`
- **认证方式**: OAuth 2.0 (API Key + Secret Key)
