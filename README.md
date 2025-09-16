# 运动健身应用 🏃‍♂️

一个基于React和PWA技术构建的运动健身应用，帮助用户制定锻炼计划、记录运动数据并查阅标准健身动作。

## ✨ 主要功能

- 📊 **仪表盘** - 展示每日锻炼概览和统计数据
- 📚 **动作库** - 提供标准健身动作参考和指导
- 📋 **锻炼计划** - 制定个性化的运动计划
- 📝 **锻炼记录** - 记录和追踪每次锻炼数据

## 🚀 技术栈

- **前端框架**: React 18.2.0
- **构建工具**: Vite 4.4.5
- **图标库**: Lucide React
- **PWA支持**: Vite PWA Plugin + Workbox
- **代码规范**: ESLint

## 📱 特性

- ✅ PWA支持，可离线使用
- ✅ 支持iOS平台打包
- ✅ 响应式设计，适配移动设备
- ✅ 本地数据存储
- ✅ Service Worker缓存策略

## 🛠️ 开发环境搭建

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发命令
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 构建iOS版本
npm run build:ios

# 预览构建结果
npm run preview

# Vercel部署构建
npm run build:vercel
```

## 📂 项目结构

```
src/
├── components/          # React组件
│   ├── Dashboard.jsx    # 仪表盘组件
│   ├── ExerciseLibrary.jsx  # 动作库组件
│   ├── WorkoutPlan.jsx  # 锻炼计划组件
│   └── WorkoutRecord.jsx    # 锻炼记录组件
├── data/
│   └── exercises.js     # 运动数据
├── utils/
│   └── storage.js       # 本地存储工具
├── App.jsx              # 主应用组件
├── main.jsx             # 应用入口
└── pwa.js              # PWA配置
```

## 📱 iOS打包指南

详细的iOS打包说明请参考 [iOS打包指南.md](./iOS打包指南.md)

## 🌐 部署指南

详细的部署说明请参考 [部署指南.md](./部署指南.md)

## 🍎 Safari添加指南

Safari浏览器添加到主屏幕的说明请参考 [Safari添加指南.md](./Safari添加指南.md)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issues和Pull Requests！

---

💪 让我们一起运动，保持健康！