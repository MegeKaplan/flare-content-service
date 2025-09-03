import { z } from 'zod'

export const GetPostsQuery = z.object({
  content: z.string(),
  creatorId: z.uuid(),
  type: z.enum(['post', 'story']),
  active: z.enum(['true', 'false']), // true = not expired, false = expired (according to expiresAt)
  offset: z.string().regex(/^\d+$/),
  limit: z.string().regex(/^\d+$/),
  sortBy: z.string(),
  sortOrder: z.enum(['asc', 'desc'])
}).partial()

export type GetPostsQuery = z.infer<typeof GetPostsQuery>
