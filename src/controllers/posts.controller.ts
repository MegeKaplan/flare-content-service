import { FastifyRequest, FastifyReply } from 'fastify'
import * as postsService from '../services/posts.service.js'
import { generateErrorResponse } from '../utils/error.js'

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const posts = await postsService.getPosts()
    reply.send(posts)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const postData = request.body
    const createdPost = await postsService.createPost(postData)
    reply.code(201).send(createdPost)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}