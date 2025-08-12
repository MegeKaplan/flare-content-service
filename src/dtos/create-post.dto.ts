import { z } from 'zod'

export const CreatePostRequest = z.object({
  creatorId: z.uuid(),
  content: z.string().optional(),
  mediaIds: z.array(z.string()).optional(),
})

export const CreatePostResponse = z.object({
  id: z.uuid(),
  content: z.string().optional(),
  creatorId: z.uuid(),
  createdAt: z.date(),
  mediaIds: z.array(z.string()).optional(),
})

export type CreatePostRequest = z.infer<typeof CreatePostRequest>
export type CreatePostResponse = z.infer<typeof CreatePostResponse>