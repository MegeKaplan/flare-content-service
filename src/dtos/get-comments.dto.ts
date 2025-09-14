import { z } from 'zod'

export const GetCommentsQuery = z.object({
  content: z.string(),
  creatorId: z.uuid(),
  targetType: z.enum(['post', 'comment']),
  targetId: z.uuid(),
  offset: z.string().regex(/^\d+$/),
  limit: z.string().regex(/^\d+$/),
  sortBy: z.string(),
  sortOrder: z.enum(['asc', 'desc'])
}).partial()

export type GetCommentsQuery = z.infer<typeof GetCommentsQuery>
