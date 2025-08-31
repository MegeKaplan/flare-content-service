import { UUIDTypes } from "uuid"
import { getDb } from "../database/mongo.js"
import { Post } from "../models/post.model.js"
import { sanitizeRegex } from "../utils/sanitize.js"
import { GetPostsQuery } from "../dtos/get-posts-dto.js"

const postsCollection = () => {
  return getDb().collection('posts')
}

export const getPosts = async (
  query: GetPostsQuery,
  options: { skip: number; limit: number; sortBy: string; sortDir: 1 | -1 }
) => {
  const mongoQuery: any = { deletedAt: { $exists: false } }

  if (query.creatorId) mongoQuery.creatorId = query.creatorId.toString()
  if (query.content) mongoQuery.content = { $regex: sanitizeRegex(query.content), $options: 'i' }

  return postsCollection()
    .find(mongoQuery)
    .skip(options.skip)
    .limit(options.limit)
    .sort({ [options.sortBy]: options.sortDir })
    .toArray()
}

export const findPostById = async (id: UUIDTypes) => {
  return postsCollection()?.findOne({ id, deletedAt: { $exists: false } })
}

export const createPost = async (postData: Post) => {
  postsCollection()?.insertOne(postData)
  return postData
}

export const updatePostById = async (id: UUIDTypes, postData: Partial<Post>) => {
  const isExists = await findPostById(id)
  await postsCollection()?.updateOne({ id, deletedAt: { $exists: false } }, { $set: postData })
  return isExists
}

export const deletePostById = async (id: UUIDTypes) => {
  return (await postsCollection()?.deleteOne({ id, deletedAt: { $exists: false } })).deletedCount > 0
}