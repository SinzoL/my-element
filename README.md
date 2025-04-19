# Vue 3 + TypeScript + Vite
```markdown
# My Element

🌟 这是一款简洁优雅的 Vue3 组件库，灵感源自 Element Plus，适用于现代 Web 项目开发。

> 项目仍在持续迭代中，欢迎关注与贡献。

## 📦 项目结构简介

本项目包括组件源码、使用示例、文档说明三大部分：

- `src/components/`：各类通用 UI 组件（如 Button、Input、Form 等）
- `docs/components/`：对应组件的 Markdown 文档说明
- `docs/demo/`：基于 Vue 编写的组件使用示例
- `src/views/`：组件文档的视图展示入口
- `src/hooks/`：常用组合式函数封装（如 useClickOutside 等）
- `public/`：静态资源

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或使用 pnpm / yarn
```

### 启动展现文档
```bash
npm run docs:dev
```

访问：http://localhost:5173

## 🧩 可用组件

已支持并提供示例和文档的组件包括：

- Button、Alert、Input、Form、Select、DatePicker、Switch、Tooltip、Rate 等

更多组件正在路上，敬请期待 🌱

## 📝 文档说明

所有组件文档均位于：

```
docs/components/*.md
```

每个文档配有对应的使用 Demo，位于：

```
docs/demo/<Component>/*.vue
```

## 🛠 技术栈

- **Vue 3 + TypeScript**
- **Vite** 构建
- 轻量化样式系统，CSS 原生 + 自定义变量管理

## 📁 命名规范

- 组件文件夹使用 PascalCase
- 文件统一使用小驼峰或 kebab-case，根据功能明确命名
- 类型定义集中于 `types.ts`

## 📌 TODO

- [ ] 支持按需引入
- [ ] 单元测试覆盖
- [ ] 完善更多组件和交互细节
- [ ] 文档站点部署

## 🤝 贡献指南

欢迎 PR 与 Issue

---
如有问题或建议，欢迎提交 issue 或发起讨论。  
```