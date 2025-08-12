import { z } from 'zod'

export const Post = z.object({
  id: z.uuid(),
  content: z.string().optional(),
  creatorId: z.uuid(),
  mediaIds: z.array(z.string()).optional(), // mediaIds are nanoid strings
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
})

export type Post = z.infer<typeof Post>