import { UUIDTypes } from "uuid"
import { getDb } from "../database/mongo.js"
import { Comment } from "../models/comment.model.js"
import { GetCommentsQuery } from "../dtos/get-comments.dto.js"
import { sanitizeRegex } from "../utils/sanitize.js"

const commentsCollection = () => {
  return getDb().collection('comments')
}

export const getComments = async (
  query: GetCommentsQuery,
  options: { skip: number; limit: number; sortBy: string; sortDir: 1 | -1 }
) => {
  const mongoQuery: any = { deletedAt: { $exists: false } }

  if (query.creatorId) mongoQuery.creatorId = query.creatorId.toString()
  if (query.content) mongoQuery.content = { $regex: sanitizeRegex(query.content), $options: 'i' }
  if (query.targetType) mongoQuery.targetType = query.targetType.toString()
  if (query.targetId) mongoQuery.targetId = query.targetId.toString()

  return commentsCollection()
    .find(mongoQuery)
    .skip(options.skip)
    .limit(options.limit)
    .sort({ [options.sortBy]: options.sortDir })
    .toArray()
}

export const findCommentById = async (id: UUIDTypes) => {
  return commentsCollection()?.findOne({ id, deletedAt: { $exists: false } })
}

export const createComment = async (commentData: Comment) => {
  commentsCollection()?.insertOne(commentData)
  return commentData
}