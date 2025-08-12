import { UUIDTypes } from "uuid"
import { getDb } from "../database/mongo.js"
import { Post } from "../models/post.model.js"

function postsCollection() {
  return getDb().collection('posts')
}

export const getPosts = async () => {
  return postsCollection()?.find().toArray()
}

export const findPostById = async (id: UUIDTypes) => {
  return postsCollection()?.findOne({ id })
}

export const createPost = async (postData: Post) => {
  postsCollection()?.insertOne(postData)
  return postData
}