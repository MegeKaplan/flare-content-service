import { z } from 'zod'
import { CreatePostRequest, CreatePostResponse } from './create-post.dto.js'

export const UpdatePostRequest = CreatePostRequest.partial()

export const UpdatePostResponse = CreatePostResponse.partial().extend({
  updatedAt: z.date(),
})

export type UpdatePostRequest = z.infer<typeof UpdatePostRequest>
export type UpdatePostResponse = z.infer<typeof UpdatePostResponse>