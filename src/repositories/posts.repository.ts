import { UUIDTypes } from "uuid"
import { getDb } from "../database/mongo.js"
import { Post } from "../models/post.model.js"

function postsCollection() {
  return getDb().collection('posts')
}

export const getPosts = async () => {
  return postsCollection()?.find({ deletedAt: { $exists: false } }).toArray()
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