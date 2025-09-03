import { z } from 'zod'

export const GetPostResponse = z.object({
  id: z.uuid(),
  content: z.string(),
  creatorId: z.uuid(),
  mediaIds: z.array(z.string()).optional(),
  type: z.enum(['post', 'story']).optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  expiresAt: z.union([z.date(), z.string()]).optional(),
})

export type GetPostResponse = z.infer<typeof GetPostResponse>