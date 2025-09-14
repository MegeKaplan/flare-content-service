import { CreateCommentRequest } from '../dtos/create-comment.dto.js'
import { Comment } from '../models/comment.model.js'
import * as commentsRepo from '../repositories/comments.repository.js'
import { UUIDTypes, v4 as uuidv4 } from 'uuid'

export const getCommentById = async (id: UUIDTypes) => {
  return await commentsRepo.findCommentById(id)
}

export const createComment = async (commentData: CreateCommentRequest) => {
  const commentId = uuidv4()

  const date = new Date()

  const newComment: Comment = {
    id: commentId,
    ...commentData,
    createdAt: date,
  }

  return await commentsRepo.createComment(newComment)
}