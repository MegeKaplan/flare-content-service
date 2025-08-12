import { z } from 'zod'

export const GetPostResponse = z.object({
  id: z.uuid(),
  content: z.string(),
  creatorId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  mediaIds: z.array(z.string()).optional(),
})

export type GetPostResponse = z.infer<typeof GetPostResponse>