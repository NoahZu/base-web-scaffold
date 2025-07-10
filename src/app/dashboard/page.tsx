'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">仪表板</h1>
          <Button onClick={handleLogout} variant="outline">
            退出登录
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>用户信息</CardTitle>
              <CardDescription>您的账户详细信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">用户名:</span>
                <span>{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">邮箱:</span>
                <span>{user.email}</span>
              </div>
              {user.name && (
                <div className="flex justify-between">
                  <span className="font-medium">姓名:</span>
                  <span>{user.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">用户ID:</span>
                <span className="text-sm text-gray-500">{user.id}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>欢迎</CardTitle>
              <CardDescription>欢迎使用我们的应用</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                您已成功登录！这是一个基于 Next.js + tRPC + Prisma 的脚手架项目。
              </p>
              <div className="space-y-2">
                <h3 className="font-medium">技术栈:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 15 with App Router</li>
                  <li>• TypeScript</li>
                  <li>• tRPC for API</li>
                  <li>• Prisma for database</li>
                  <li>• Tailwind CSS + shadcn/ui</li>
                  <li>• JWT Authentication</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}