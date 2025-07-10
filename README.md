# 🚀 全栈开发脚手架

基于 Next.js + tRPC + Prisma + Tailwind CSS 的现代化 Web 应用开发模板，专为快速开发和 AI 优化而设计。

![技术栈](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![tRPC](https://img.shields.io/badge/tRPC-10-398CCB?style=for-the-badge&logo=trpc)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 项目概述

这是一个**全栈一体化(Full-Stack Monolith)**解决方案，前后端代码在同一个项目中，通过 tRPC 实现类型安全的 API 通信。非常适合：

- 🧑‍💻 独立开发者快速构建应用
- 🚀 MVP 和原型项目开发
- 🤖 AI 辅助编程项目
- 📱 需要同时支持 PC 和移动端的应用

## 🚀 技术栈

### 核心技术
- **前端框架**: Next.js 15 (App Router) + TypeScript
- **UI样式**: Tailwind CSS + shadcn/ui
- **后端API**: tRPC + Next.js API Routes
- **数据库**: Prisma ORM + PostgreSQL
- **认证系统**: JWT + bcryptjs
- **状态管理**: TanStack Query (React Query)

### 开发工具
- **代码规范**: ESLint + TypeScript
- **样式方案**: Tailwind CSS + CSS Variables
- **构建工具**: Next.js内置Webpack
- **包管理**: npm
- **数据库管理**: Prisma Studio

## ✨ 核心特性

### 🔐 完整认证系统
- ✅ 用户注册（邮箱 + 用户名 + 密码）
- ✅ 用户登录（邮箱 + 密码）
- ✅ JWT Token 自动管理
- ✅ 密码 bcrypt 加密存储
- ✅ 前端路由保护

### 📱 响应式设计
- ✅ 移动端优先设计
- ✅ 断点自适应布局 (sm/md/lg/xl)
- ✅ 触摸友好的交互体验
- ✅ 现代化 UI 组件库

### 🛠️ 开发体验
- ✅ **类型安全**: 端到端 TypeScript 类型检查
- ✅ **自动补全**: tRPC 提供完整的智能提示
- ✅ **热重载**: 前后端代码同时更新
- ✅ **零配置**: 开箱即用的开发环境

## 🛠️ 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd base-web-scaffold
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动数据库
```bash
# 启动 Prisma 本地开发数据库
npx prisma dev

# 生成 Prisma 客户端
npx prisma generate

# 创建数据库表
npx prisma migrate dev --name init
```

### 4. 配置环境变量
环境变量已预配置在 `.env` 文件中：

```env
# 数据库连接（Prisma 本地开发数据库）
DATABASE_URL="prisma+postgres://localhost:51213/..."

# JWT 密钥（生产环境请更换）
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js 认证配置
NEXTAUTH_SECRET="your-nextauth-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. 启动开发服务器
```bash
npm run dev
```

🎉 打开 [http://localhost:3000](http://localhost:3000) 查看应用！

## 📁 项目结构

```
base-web-scaffold/
├── prisma/
│   ├── schema.prisma          # 数据库模型定义
│   └── migrations/            # 数据库迁移文件
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/trpc/         # tRPC API 路由
│   │   ├── login/            # 登录页面
│   │   ├── register/         # 注册页面
│   │   ├── dashboard/        # 用户仪表板
│   │   ├── layout.tsx        # 根布局组件
│   │   ├── page.tsx          # 首页
│   │   └── globals.css       # 全局样式
│   ├── components/           # React 组件
│   │   ├── ui/              # shadcn/ui 基础组件
│   │   └── providers/       # Context 提供者
│   ├── server/              # tRPC 服务端
│   │   ├── routers/         # API 路由定义
│   │   │   ├── auth.ts      # 认证相关接口
│   │   │   └── index.ts     # 路由聚合
│   │   └── trpc.ts          # tRPC 配置
│   ├── lib/                 # 工具函数库
│   │   ├── auth.ts          # 认证工具函数
│   │   ├── prisma.ts        # 数据库客户端
│   │   └── utils.ts         # 通用工具函数
│   └── utils/               # 客户端工具
│       └── trpc.ts          # tRPC 客户端配置
├── .env                     # 环境变量配置
├── .env.example            # 环境变量示例
├── components.json         # shadcn/ui 配置
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

## 🔧 可用脚本

### 开发环境
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint 检查
```

### 数据库管理
```bash
npx prisma dev              # 启动本地开发数据库
npx prisma studio           # 打开数据库管理界面
npx prisma generate         # 生成 Prisma 客户端
npx prisma migrate dev      # 运行数据库迁移
npx prisma migrate deploy   # 部署数据库迁移
npx prisma db push          # 推送 schema 到数据库
```

## 🏗️ 核心架构

### 数据流
```
浏览器 → React组件 → tRPC Client → tRPC Server → Prisma → PostgreSQL
   ↑                                                            ↓
   ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
```

### 认证流程
1. 用户提交登录表单
2. tRPC 验证用户凭据
3. 服务端生成 JWT Token
4. 客户端存储 Token 到 localStorage
5. 后续请求自动携带 Token
6. 服务端验证 Token 有效性

### 数据库设计
```sql
-- 用户表
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String   // bcrypt加密
  name      String?
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🎨 页面展示

### 首页
- 🏠 产品介绍和特性展示
- 🎯 技术栈说明
- 🚀 快速入口链接

### 认证页面
- 📝 用户注册（邮箱/用户名/密码）
- 🔐 用户登录（邮箱/密码）
- 📱 响应式表单设计
- ⚡ 实时表单验证

### 仪表板
- 👤 用户信息展示
- 📊 应用状态概览
- 🚪 安全退出功能

## 🚀 部署指南

### Vercel 部署（推荐）
1. **连接仓库**
   ```bash
   git push origin main
   ```

2. **Vercel 配置**
   - 导入 GitHub 仓库
   - 框架预设选择 "Next.js"
   - 自动检测构建设置

3. **环境变量设置**
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   JWT_SECRET=your-production-jwt-secret
   NEXTAUTH_SECRET=your-production-nextauth-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

### 数据库部署

#### 选项 1: Supabase（推荐）
```bash
# 1. 创建 Supabase 项目
# 2. 获取数据库连接字符串
# 3. 更新环境变量
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# 4. 运行生产迁移
npx prisma migrate deploy
```

#### 选项 2: PlanetScale
```bash
# 1. 创建 PlanetScale 数据库
# 2. 获取连接字符串
DATABASE_URL="mysql://user:password@host:port/database?sslaccept=strict"

# 3. 推送 schema
npx prisma db push
```

#### 选项 3: Railway
```bash
# 1. 创建 Railway 项目
# 2. 添加 PostgreSQL 服务
# 3. 获取连接字符串
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 📱 功能详解

### 🔐 认证系统
- **注册流程**: 邮箱唯一性验证 → 密码强度检查 → bcrypt加密存储
- **登录流程**: 邮箱验证 → 密码比对 → JWT生成 → 前端存储
- **安全特性**: 密码加密、JWT过期时间、前端路由保护

### 🎨 UI组件
- **设计系统**: 基于 shadcn/ui 的一致性设计
- **主题支持**: CSS Variables 实现主题切换
- **响应式**: 移动端优先的断点设计
- **交互反馈**: Loading状态、错误提示、成功反馈

### 🛠️ 开发工具
- **类型安全**: 端到端 TypeScript 类型检查
- **API调试**: tRPC提供完整的API类型推导
- **数据库管理**: Prisma Studio可视化管理
- **代码规范**: ESLint + Prettier 自动格式化

## 🔧 自定义配置

### 添加新的API路由
```typescript
// src/server/routers/posts.ts
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const postsRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100) }))
    .query(async ({ input, ctx }) => {
      const posts = await ctx.prisma.post.findMany({
        take: input.limit,
        orderBy: { createdAt: 'desc' },
      });
      return posts;
    }),
});
```

### 添加新的数据库模型
```prisma
// prisma/schema.prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 添加新的UI组件
```bash
# 安装新的 shadcn/ui 组件
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 项目
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范
- 使用 TypeScript 编写所有代码
- 遵循 ESLint 配置规则
- 组件命名使用 PascalCase
- 函数命名使用 camelCase
- 文件命名使用 kebab-case

## 📝 更新日志

### v1.0.0 (2024-07-10)
- ✅ 完成基础脚手架搭建
- ✅ 实现用户认证系统
- ✅ 添加响应式UI设计
- ✅ 集成 tRPC + Prisma
- ✅ 完善项目文档

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目的贡献：
- [Next.js](https://nextjs.org/) - React 全栈框架
- [tRPC](https://trpc.io/) - 类型安全的 API 层
- [Prisma](https://prisma.io/) - 现代数据库工具包
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 现代化 UI 组件库

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！

📧 有问题或建议？欢迎提 [Issue](https://github.com/your-username/base-web-scaffold/issues)！
