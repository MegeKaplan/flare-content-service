import { FastifyRequest, FastifyReply } from 'fastify'
import * as commentsService from '../services/comments.service.js'
import { generateErrorResponse } from '../utils/error.js'
import { validateBody } from '../utils/validate.js'
import { UUIDTypes } from 'uuid'
import { GetCommentResponse } from '../dtos/get-comment.dto.js'
import { CreateCommentRequest, CreateCommentResponse } from '../dtos/create-comment.dto.js'

export const getCommentById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: UUIDTypes }
    const comment = await commentsService.getCommentById(id)

    if (!comment) {
      return reply.code(404).send(generateErrorResponse(new Error('Comment not found')))
    }

    const response: GetCommentResponse = {
      id: comment.id,
      content: comment.content,
      creatorId: comment.creatorId,
      targetType: comment.targetType,
      targetId: comment.targetId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }

    reply.code(200).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}

export const createComment = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body = request.body as CreateCommentRequest
    const creatorId = request.headers['x-user-id'] as string

    const isValid = validateBody(CreateCommentRequest, { ...body, creatorId })
    if (!isValid) {
      return reply.code(400).send(generateErrorResponse(new Error('Invalid request body or headers')))
    }

    const createdComment = await commentsService.createComment({ ...body, creatorId })

    const response: CreateCommentResponse = {
      id: createdComment.id,
      content: createdComment.content,
      targetType: createdComment.targetType,
      targetId: createdComment.targetId,
      creatorId: createdComment.creatorId,
      createdAt: createdComment.createdAt,
      updatedAt: createdComment.updatedAt,
    }

    reply.code(201).send(response)
  } catch (error) {
    reply.code(500).send(generateErrorResponse(error as Error))
  }
}