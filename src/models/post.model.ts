import { z } from 'zod'

export const Post = z.object({
  id: z.uuid(),
  content: z.string().optional(),
  creatorId: z.uuid(),
  mediaIds: z.array(z.string()).optional(), // mediaIds are nanoid strings
  type: z.enum(['post', 'story']).optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
  expiresAt: z.union([z.date(), z.string()]).optional(),
})

export type Post = z.infer<typeof Post>