import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface WelcomeEmailProps {
  to: string;
  username: string;
  email: string;
}

export async function sendWelcomeEmail({ to, username, email }: WelcomeEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Housing Resource <onboarding@resend.dev>', // 使用 Resend 默认域名
      to: [to],
      subject: '🏠 欢迎加入 Housing Resource Management System！',
      html: generateWelcomeEmailHTML({ username, email }),
    });

    if (error) {
      console.error('邮件发送失败:', error);
      return { success: false, error };
    }

    console.log('欢迎邮件发送成功:', data);
    return { success: true, data };
  } catch (error) {
    console.error('邮件服务错误:', error);
    return { success: false, error };
  }
}

function generateWelcomeEmailHTML({ username, email }: { username: string; email: string }) {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>欢迎加入 Housing Resource</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
        }
        .welcome-text {
          font-size: 1.2rem;
          color: #4b5563;
          margin-bottom: 30px;
        }
        .info-box {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .dark-theme {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: #f9fafb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🏠 Housing Resource</div>
          <p class="welcome-text">欢迎加入我们的专属社区！</p>
        </div>
        
        <div class="content">
          <h2>你好，${username}！</h2>
          <p>感谢你注册 Housing Resource Management System。我们很高兴你成为我们社区的一员。</p>
          
          <div class="info-box">
            <h3>📋 你的账户信息</h3>
            <p><strong>用户名:</strong> ${username}</p>
            <p><strong>邮箱:</strong> ${email}</p>
            <p><strong>注册时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
          </div>
          
          <h3>🎯 接下来你可以：</h3>
          <ul>
            <li>🏡 浏览精选房产资源</li>
            <li>🔍 使用高级搜索和筛选功能</li>
            <li>⭐ 升级会员获得完整访问权限</li>
            <li>💎 使用积分系统解锁专属内容</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="http://localhost:3000/login" class="button">立即登录</a>
          </div>
        </div>
        
        <div class="footer">
          <p>这是一封自动发送的邮件，请勿回复。</p>
          <p>如有问题，请联系我们的客服团队。</p>
          <p>&copy; 2024 Housing Resource Management System. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// 邮箱验证邮件
export async function sendVerificationEmail({ to, username, verificationToken }: {
  to: string;
  username: string;
  verificationToken: string;
}) {
  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
    
    const { data, error } = await resend.emails.send({
      from: 'Housing Resource <onboarding@resend.dev>',
      to: [to],
      subject: '🔐 请验证你的邮箱地址',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>邮箱验证</h2>
          <p>你好 ${username}，</p>
          <p>请点击下面的链接验证你的邮箱地址：</p>
          <a href="${verificationUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
            验证邮箱
          </a>
          <p>如果按钮无法点击，请复制以下链接到浏览器：</p>
          <p>${verificationUrl}</p>
          <p>此链接将在24小时后过期。</p>
        </div>
      `,
    });

    return { success: !error, data, error };
  } catch (error) {
    console.error('验证邮件发送失败:', error);
    return { success: false, error };
  }
}
