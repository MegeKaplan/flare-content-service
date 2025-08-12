import { FastifyRequest, FastifyReply } from 'fastify'
import * as postsService from '../services/posts.service.js'
import { generateErrorResponse } from '../utils/error.js'
import { CreatePostRequest, CreatePostResponse } from '../dtos/create-post.dto.js'
import { validateBody } from '../utils/validate.js'
import { GetPostResponse } from '../dtos/get-post.dto.js'
import { UUIDTypes } from 'uuid'

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const posts = await postsService.getPosts()

    const response: GetPostResponse[] = posts.map(post => {
      return {
        id: post._id,
        content: post.content,
        creatorId: post.creatorId,
        createdAt: post.createdAt,
        mediaIds: post.mediaIds,
      }
    })

    reply.code(200).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: UUIDTypes }
    const post = await postsService.getPostById(id)

    if (!post) {
      return reply.code(404).send(generateErrorResponse(new Error('Post not found')))
    }

    const response: GetPostResponse = {
      id: post._id,
      content: post.content,
      creatorId: post.creatorId,
      createdAt: post.createdAt,
      mediaIds: post.mediaIds,
    }

    reply.code(200).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as CreatePostRequest
    const creatorId = request.headers['x-user-id'] as string

    const isValid = validateBody(CreatePostRequest, { ...body, creatorId })
    if (!isValid) {
      return reply.code(400).send(generateErrorResponse(new Error('Invalid request body or headers')))
    }

    const createdPost = await postsService.createPost({ ...body, creatorId })

    const response: CreatePostResponse = {
      id: createdPost._id,
      content: createdPost.content,
      creatorId: createdPost.creatorId,
      createdAt: createdPost.createdAt,
      mediaIds: createdPost.mediaIds,
    }

    reply.code(201).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}