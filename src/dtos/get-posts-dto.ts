import { z } from 'zod'

export const GetPostsQuery = z.object({
  creatorId: z.uuid(),
  content: z.string(),
  offset: z.string().regex(/^\d+$/),
  limit: z.string().regex(/^\d+$/),
  sortBy: z.string(),
  sortOrder: z.enum(['asc', 'desc'])
}).partial()

export type GetPostsQuery = z.infer<typeof GetPostsQuery>
