import { UUIDTypes } from "uuid"
import { getDb } from "../database/mongo.js"
import { Comment } from "../models/comment.model.js"

const commentsCollection = () => {
  return getDb().collection('comments')
}

export const findCommentById = async (id: UUIDTypes) => {
  return commentsCollection()?.findOne({ id, deletedAt: { $exists: false } })
}

export const createComment = async (commentData: Comment) => {
  commentsCollection()?.insertOne(commentData)
  return commentData
}