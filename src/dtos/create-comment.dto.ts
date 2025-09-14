import { z } from 'zod'

export const CreateCommentRequest = z.object({
  content: z.string().min(1).max(500),
  targetType: z.enum(['post', 'comment']),
  targetId: z.uuid(),
  creatorId: z.uuid(),
})

export const CreateCommentResponse = z.object({
  id: z.uuid(),
  content: z.string().optional(),
  targetType: z.enum(['post', 'comment']),
  targetId: z.uuid(),
  creatorId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export type CreateCommentRequest = z.infer<typeof CreateCommentRequest>
export type CreateCommentResponse = z.infer<typeof CreateCommentResponse>