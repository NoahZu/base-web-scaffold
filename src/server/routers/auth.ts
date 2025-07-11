import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  register: publicProcedure
    .input(z.object({
      email: z.string().email(),
      username: z.string().min(3).max(20),
      password: z.string().min(6),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { email, username, password, name } = input;

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username },
          ],
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email or username already exists',
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          name,
        },
      });

      // Generate token
      const token = generateToken(user.id);

      // Send welcome email (non-blocking)
      try {
        await sendWelcomeEmail({
          to: user.email,
          username: user.username,
          email: user.email,
        });
        console.log(`欢迎邮件已发送给用户: ${user.email}`);
      } catch (emailError) {
        // 邮件发送失败不应该影响注册流程
        console.error('欢迎邮件发送失败:', emailError);
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        },
        token,
        message: '注册成功！欢迎邮件已发送到你的邮箱。',
      };
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { email, password } = input;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      // Generate token
      const token = generateToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        },
        token,
      };
    }),
});