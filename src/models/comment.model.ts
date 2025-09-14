import { z } from 'zod'

export const Comment = z.object({
  id: z.uuid(),
  content: z.string(),
  creatorId: z.uuid(),
  targetType: z.enum(['post', 'comment']),
  targetId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
})

export type Comment = z.infer<typeof Comment>