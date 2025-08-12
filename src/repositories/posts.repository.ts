import { UUIDTypes } from "uuid"

const posts: any[] = []

export const getPosts = async () => {
  return posts
}

export const findPostById = async (id: UUIDTypes) => {
  return posts.find(post => post._id === id)
}

export const createPost = async (postData: any) => {
  posts.push(postData)
  return postData
}