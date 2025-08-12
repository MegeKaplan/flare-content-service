import { z } from 'zod'

export const Post = z.object({
  _id: z.uuid(),
  content: z.string().optional(),
  creatorId: z.uuid(),
  mediaIds: z.array(z.string()).optional(), // mediaIds are nanoid strings
  createdAt: z.date().optional().default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
})

export type Post = z.infer<typeof Post>