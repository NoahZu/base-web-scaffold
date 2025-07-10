import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { authRouter } from './auth';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),
  auth: authRouter,
});

export type AppRouter = typeof appRouter;