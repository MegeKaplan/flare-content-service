import { z } from 'zod'

export const CreatePostRequest = z.object({
  content: z.string().optional(),
  creatorId: z.uuid(),
  mediaIds: z.array(z.string()).optional(),
  type: z.enum(['post', 'story']).optional().default('post'),
  expiresAt: z.union([z.date(), z.string()]).optional(),
})

export const CreatePostResponse = z.object({
  id: z.uuid(),
  content: z.string().optional(),
  creatorId: z.uuid(),
  mediaIds: z.array(z.string()).optional(),
  type: z.enum(['post', 'story']).optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  expiresAt: z.union([z.date(), z.string()]).optional(),
})

export type CreatePostRequest = z.infer<typeof CreatePostRequest>
export type CreatePostResponse = z.infer<typeof CreatePostResponse>