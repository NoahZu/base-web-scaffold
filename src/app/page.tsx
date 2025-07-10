import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            全栈开发脚手架
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            基于 Next.js + tRPC + Prisma + Tailwind 的现代化Web应用开发模板
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                开始使用
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                登录
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-blue-600">⚡</span>
                快速开发
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                使用现代化的技术栈，内置最佳实践，让你专注于业务逻辑而非基础配置
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-green-600">🔒</span>
                安全认证
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                内置JWT认证系统，密码加密存储，支持用户注册、登录等完整流程
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-purple-600">📱</span>
                响应式设计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                基于Tailwind CSS和shadcn/ui，完美适配桌面端和移动端设备
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">技术栈</CardTitle>
            <CardDescription className="text-center">
              精选的现代化开发工具和框架
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Next.js 15</div>
                <div className="text-sm text-gray-600">React框架</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">tRPC</div>
                <div className="text-sm text-gray-600">类型安全API</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Prisma</div>
                <div className="text-sm text-gray-600">数据库ORM</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Tailwind</div>
                <div className="text-sm text-gray-600">CSS框架</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p>使用现代化工具构建，为AI优化开发而设计</p>
        </div>
      </div>
    </div>
  );
}
