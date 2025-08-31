# 🔄 项目结构迁移步骤

## 立即执行的迁移步骤

### 1. 备份当前项目
```bash
# 在digital_museum目录下
cp -r SBQY-Digital-Museum-0825 SBQY-Digital-Museum-0825-backup
```

### 2. 创建前端目录并移动文件
```bash
cd SBQY-Digital-Museum-0825
mkdir frontend

# 移动前端文件到frontend目录
mv src frontend/
mv public frontend/
mv babel.config.js frontend/
mv jsconfig.json frontend/
mv .eslintrc.js frontend/
mv .browserslistrc frontend/
mv vue.config.js frontend/
```

### 3. 处理package.json
```bash
# 复制前端package.json
cp package.json frontend/package.json

# 使用新的根目录package.json
mv package-root.json package.json
```

### 4. 移动node_modules
```bash
mv node_modules frontend/node_modules
mv package-lock.json frontend/package-lock.json
```

### 5. 安装根目录依赖
```bash
npm install concurrently
```

## 🔧 后端结构已经创建完成

✅ 新的后端结构：
```
backend/
├── config/           # 配置文件
├── controllers/      # 控制器
├── services/        # 业务服务
├── llm/            # LLM模块
│   └── providers/   # LLM提供商
├── routes/         # 路由
├── server.js       # 主服务器文件
├── package.json    # 后端依赖
├── Dockerfile      # Docker配置
└── .env           # 环境变量
```

## ✅ 迁移后的启动方式

### 开发模式
```bash
# 根目录 - 同时启动前后端
npm run dev

# 或者分别启动
npm run dev:frontend  # 启动前端 (端口8080)
npm run dev:backend   # 启动后端 (端口3001)
```

### 生产模式
```bash
npm run build        # 构建前端
npm start           # 启动后端
```

### Docker部署
```bash
docker-compose up --build
```

## 📁 迁移后的目录结构

```
SBQY-Digital-Museum-0825/
├── README.md
├── package.json                 # 根项目管理
├── docker-compose.yml          # Docker配置
├── PROJECT_RESTRUCTURE.md      # 结构说明
├── migrate.md                  # 迁移指南
├── .gitignore
│
├── frontend/                   # 前端Vue项目
│   ├── package.json
│   ├── vue.config.js
│   ├── src/
│   ├── public/
│   └── node_modules/
│
├── backend/                    # 后端Node.js项目
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── llm/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── docs/                      # 文档目录 (可选)
```

## ⚠️ 重要注意事项

1. **环境变量**: 确保backend/.env文件包含正确的API密钥
2. **端口配置**: 前端8080，后端3001
3. **API代理**: frontend/vue.config.js已配置代理到后端
4. **依赖安装**: 迁移后需要重新安装依赖

## 🎯 迁移完成检查

- [ ] 前端文件已移动到frontend/目录
- [ ] 后端采用新的MVC架构
- [ ] 根目录package.json可以管理前后端
- [ ] Docker配置已就绪
- [ ] 环境变量配置正确
- [ ] API代理工作正常
- [ ] 前后端可以独立运行

## 🚀 后续LLM功能扩展

迁移完成后，可以在以下目录进行LLM功能扩展：

- `backend/llm/providers/` - 添加新的LLM提供商
- `backend/config/llm.js` - 调整LLM配置
- `backend/services/` - 扩展业务逻辑
- `backend/controllers/` - 添加新的API接口

这样的结构使得：
✅ 前后端完全分离
✅ 代码结构清晰
✅ 便于团队协作
✅ 易于扩展LLM功能
✅ 支持Docker化部署
