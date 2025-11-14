# 全栈脚手架 API 与组件参考

本指南汇总项目内可复用的 tRPC API、客户端工具、库函数以及 UI 组件，帮助你快速理解它们的职责、依赖和最佳实践用法。所有示例均使用 TypeScript，默认在 Next.js App Router 环境下运行。

## 目录
- [tRPC API](#trpc-api)
- [客户端工具](#客户端工具)
- [库与实用函数](#库与实用函数)
- [UI 组件](#ui-组件)
- [页面组件](#页面组件)
- [环境变量清单](#环境变量清单)
- [常见使用流程](#常见使用流程)

## tRPC API

### 接入端点
- **路径**：`/api/trpc`
- **协议**：支持 `GET` 与 `POST`，推荐通过 tRPC 客户端或 React Query 集成。
- **序列化**：使用 `superjson`，在服务端和客户端之间传递更丰富的数据类型。

> ✅ 若需扩展 API，请在 `src/server/routers` 中添加新的 router 或 procedure，并在 `appRouter` 中合并。

### `hello` 查询
- **路径**：`trpc.hello`
- **输入**：
  ```ts
  { name: string }
  ```
- **返回**：
  ```ts
  { greeting: string } // e.g. "Hello Alice!"
  ```
- **典型用途**：健康检查、模板示例。
- **客户端示例**：
  ```ts
  const { data, isLoading } = trpc.hello.useQuery({ name: "Alice" });
  ```
- **错误**：输入未通过 Zod 校验时返回 `BAD_REQUEST`。

### `auth.register` 变更
- **路径**：`trpc.auth.register`
- **输入**：
  ```ts
  {
    email: string;        // 必须是合法邮箱
    username: string;     // 3-20 个字符
    password: string;     // ≥ 6 位
    name?: string;        // 可选昵称
  }
  ```
- **返回**：
  ```ts
  {
    user: { id: string; email: string; username: string; name?: string; avatar?: string | null };
    token: string;        // JWT，默认 7 天过期
    message: string;      // 欢迎提示
  }
  ```
- **业务逻辑**：
  1. 检查邮箱或用户名是否已存在。
  2. 使用 `hashPassword` 加密密码。
  3. 通过 Prisma 写入用户。
  4. 签发 JWT。
  5. 异步发送欢迎邮件（失败不影响注册）。
- **客户端示例**：
  ```ts
  const mutation = trpc.auth.register.useMutation();
  mutation.mutate({ email, username, password, name });
  ```
- **常见错误**：
  - `CONFLICT`：邮箱或用户名重复。
  - `BAD_REQUEST`：输入校验失败。
  - `INTERNAL_SERVER_ERROR`：JWT 或数据库配置缺失。

### `auth.login` 变更
- **路径**：`trpc.auth.login`
- **输入**：
  ```ts
  { email: string; password: string }
  ```
- **返回**：
  ```ts
  {
    user: { id: string; email: string; username: string; name?: string; avatar?: string | null };
    token: string; // JWT
  }
  ```
- **业务逻辑**：
  1. 按邮箱查询用户。
  2. 使用 `verifyPassword` 校验密码。
  3. 生成新的 JWT。
- **客户端示例**：
  ```ts
  const mutation = trpc.auth.login.useMutation({
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
  mutation.mutate({ email, password });
  ```
- **常见错误**：凭证错误时返回 `UNAUTHORIZED`。

## 客户端工具

### `TRPCProvider`
- **位置**：`src/components/providers/trpc-provider.tsx`
- **职责**：创建并注入全局的 tRPC 客户端和 React Query `QueryClient`。
- **用法**：在 `app/layout.tsx` 中包裹应用根节点。
  ```tsx
  <TRPCProvider>
    {children}
  </TRPCProvider>
  ```
- **自定义**：如需修改 batch link、请求头等，在 provider 内部调整 `trpc.createClient` 配置。

### `trpc` React 客户端
- **位置**：`src/utils/trpc.ts`
- **导出**：`createTRPCReact<AppRouter>()` 的实例，提供 `.useQuery`、`.useMutation`、`.useUtils` 等 Hook。
- **使用模式**：
  ```ts
  import { trpc } from "@/utils/trpc";
  const helloQuery = trpc.hello.useQuery({ name: "Alice" });
  const login = trpc.auth.login.useMutation();
  ```

## 库与实用函数

### 认证工具（`src/lib/auth.ts`）
- `hashPassword(password: string): Promise<string>`  
  使用 `bcryptjs` 以 12 轮盐值哈希密码，适用于注册或重置密码。
- `verifyPassword(password: string, hashed: string): Promise<boolean>`  
  比对明文密码与存储哈希。
- `generateToken(userId: string): string`  
  基于 `JWT_SECRET` 签发 7 天有效的 JWT。若未配置环境变量将抛出异常。
- `verifyToken(token: string): { userId: string } | null`  
  校验 JWT，失败时返回 `null` 而非抛错，方便中间件使用。

**示例**：
```ts
const hashed = await hashPassword(plain);
const ok = await verifyPassword(plain, hashed);
const token = generateToken(userId);
const payload = verifyToken(token); // { userId } | null
```

### 邮件工具（`src/lib/email.ts`）
- `WelcomeEmailProps`：欢迎邮件入参类型。
- `sendWelcomeEmail({ to, username, email })`  
  - 使用 Resend 服务发送欢迎邮件。  
  - 返回 `{ success: boolean; data?; error? }`。  
  - 失败会记录日志但不会抛错。
- `sendVerificationEmail({ to, username, verificationToken })`  
  - 构造 `NEXTAUTH_URL/verify-email?token=...` 验证链接。  
  - 返回 `{ success: boolean; data?; error? }`，失败同样仅记录日志。

**示例**：
```ts
await sendWelcomeEmail({ to: user.email, username: user.username, email: user.email });
await sendVerificationEmail({ to: user.email, username: user.username, verificationToken });
```

> 📌 需先配置 `RESEND_API_KEY` 和 `NEXTAUTH_URL` 环境变量。

### Prisma 客户端（`src/lib/prisma.ts`）
- 导出单例 `prisma`，在开发模式下使用 `globalThis` 缓存，避免热重载重复实例化。
- 使用方式：
  ```ts
  import { prisma } from "@/lib/prisma";
  const user = await prisma.user.findUnique({ where: { email } });
  ```

### 样式工具（`src/lib/utils.ts`）
- `cn(...inputs: ClassValue[]): string`  
  基于 `clsx` + `tailwind-merge`，用于合并 Tailwind class。
  ```ts
  <div className={cn("p-4", isActive && "bg-primary")} />
  ```

## UI 组件

### `Button`（`src/components/ui/button.tsx`）
- **Props**：继承原生 `button`，扩展 `variant`（`default`、`destructive`、`outline`、`secondary`、`ghost`、`link`）与 `size`（`default`、`sm`、`lg`、`icon`），支持 `asChild` 通过 Radix `Slot` 复用语义标签。
- **用法**：
  ```tsx
  <Button variant="outline" size="lg">操作</Button>
  <Button asChild>
    <a href="/dashboard">进入仪表板</a>
  </Button>
  ```
- **自定义类**：传入 `className` 会合并到现有样式。

### `Card` 系列（`src/components/ui/card.tsx`）
- **导出**：`Card`、`CardHeader`、`CardTitle`、`CardDescription`、`CardAction`、`CardContent`、`CardFooter`。
- **布局特性**：使用 CSS container queries 和 slot 数据属性，便于自定义样式。
- **组合示例**：
  ```tsx
  <Card>
    <CardHeader>
      <CardTitle>标题</CardTitle>
      <CardDescription>补充说明</CardDescription>
    </CardHeader>
    <CardContent>主体内容</CardContent>
    <CardFooter>
      <Button>确认</Button>
    </CardFooter>
  </Card>
  ```

### 表单套件（`src/components/ui/form.tsx`）
- **核心导出**：
  - `Form`：`react-hook-form` 的 `FormProvider` 代理。
  - `FormField`：封装 `Controller`，自动向下传递字段上下文。
  - `FormItem` / `FormLabel` / `FormControl` / `FormDescription` / `FormMessage`：遵循 shadcn/ui 约定，为表单项提供一致的辅助信息与错误状态。
  - `useFormField()`：在自定义输入组件中读取当前字段状态。
- **示例**：
  ```tsx
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>邮箱</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  </Form>
  ```

### `Input`（`src/components/ui/input.tsx`）
- 封装原生 `<input>`，统一焦点、禁用、无障碍状态样式。
- 支持透传所有标准属性：
  ```tsx
  <Input id="password" type="password" required minLength={6} />
  ```

### `Label`（`src/components/ui/label.tsx`）
- 基于 Radix Label，支持 `peer-disabled`、`group-data[disabled]` 等场景。
- 常与 `FormLabel` 或 `Input` 配合：
  ```tsx
  <Label htmlFor="username">用户名</Label>
  <Input id="username" />
  ```

## 页面组件

- `RootLayout`（`src/app/layout.tsx`）  
  设置全球字体、注入 `TRPCProvider`，适合扩展全局 Providers。

- `Home`（`src/app/page.tsx`）  
  提供首页展示与 CTA，引导进入注册或登录流程。

- `RegisterPage`（`src/app/register/page.tsx`）  
  使用 `trpc.auth.register` 变更提交表单，包含本地密码确认校验。

- `LoginPage`（`src/app/login/page.tsx`）  
  调用 `trpc.auth.login`，成功后将 token 与用户信息写入 `localStorage` 并跳转仪表板。

- `DashboardPage`（`src/app/dashboard/page.tsx`）  
  从 `localStorage` 读取用户态，若缺失则重定向登录；展示用户信息并提供登出按钮。

> 📎 页面均为 `use client` 组件，可视需求添加服务端渲染或更严格的会话校验。

## 环境变量清单
- `DATABASE_URL`：Prisma 数据源连接串。
- `JWT_SECRET`：JWT 签名密钥。
- `RESEND_API_KEY`：Resend 邮件服务 Token。
- `NEXTAUTH_URL`：邮箱验证链接使用的站点基础地址。

建议在 `.env.local` 中配置上述变量，并在部署环境确保同名变量存在。

## 常见使用流程

### 注册后自动登录并跳转
1. 调用 `trpc.auth.register.useMutation`，在 `onSuccess` 中持久化 token 与用户信息。
2. 跳转至 `/dashboard`。
3. 仪表板组件检测本地存储并展示用户信息。

```ts
const router = useRouter();
const register = trpc.auth.register.useMutation({
  onSuccess(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    router.push("/dashboard");
  },
});
```

### 发送额外通知邮件
1. 在服务端 procedure 中引入 `sendVerificationEmail`。
2. 生成业务自定义 token。
3. 调用邮件函数并根据返回值记录日志或告警。

```ts
await sendVerificationEmail({
  to: user.email,
  username: user.username,
  verificationToken,
});
```

---

若需补充新的 API 或组件，请保持与本文相同的结构更新说明，确保团队成员能快速理解接口行为与依赖。
