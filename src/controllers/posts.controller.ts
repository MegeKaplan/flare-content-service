import { FastifyRequest, FastifyReply } from 'fastify'
import * as postsService from '../services/posts.service.js'
import { generateErrorResponse } from '../utils/error.js'
import { CreatePostRequest, CreatePostResponse } from '../dtos/create-post.dto.js'
import { validateBody } from '../utils/validate.js'
import { GetPostResponse } from '../dtos/get-post.dto.js'
import { UUIDTypes } from 'uuid'
import { UpdatePostRequest, UpdatePostResponse } from '../dtos/update-post.dto.js'

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const posts = await postsService.getPosts()

    const response: GetPostResponse[] = posts.map(post => {
      return {
        id: post.id,
        content: post.content,
        creatorId: post.creatorId,
        createdAt: post.createdAt,
        mediaIds: post.mediaIds,
        updatedAt: post.updatedAt,
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
      id: post.id,
      content: post.content,
      creatorId: post.creatorId,
      createdAt: post.createdAt,
      mediaIds: post.mediaIds,
      updatedAt: post.updatedAt,
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
      id: createdPost.id,
      content: createdPost.content,
      creatorId: createdPost.creatorId,
      createdAt: createdPost.createdAt,
      mediaIds: createdPost.mediaIds,
      updatedAt: createdPost.updatedAt,
    }

    reply.code(201).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}

export const updatePostById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: UUIDTypes }
    const body = request.body as UpdatePostRequest
    const creatorId = request.headers['x-user-id'] as string

    const isValid = validateBody(UpdatePostRequest, { ...body, creatorId })
    if (!isValid) {
      return reply.code(400).send(generateErrorResponse(new Error('Invalid request body or headers')))
    }

    const updatedPost = await postsService.updatePostById(id, { ...body, creatorId })
    if (!updatedPost) {
      return reply.code(404).send(generateErrorResponse(new Error('Post not found')))
    }

    const response: UpdatePostResponse = {
      id: updatedPost.id,
      content: updatedPost.content,
      creatorId: updatedPost.creatorId,
      createdAt: updatedPost.createdAt,
      mediaIds: updatedPost.mediaIds,
      updatedAt: updatedPost.updatedAt,
    }

    reply.code(200).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}