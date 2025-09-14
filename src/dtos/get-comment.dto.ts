import { z } from 'zod'

export const GetCommentResponse = z.object({
  id: z.uuid(),
  content: z.string(),
  targetType: z.enum(['post', 'comment']),
  targetId: z.uuid(),
  creatorId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export type GetCommentResponse = z.infer<typeof GetCommentResponse>