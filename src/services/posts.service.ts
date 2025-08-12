import { CreatePostRequest } from '../dtos/create-post.dto.js'
import { Post } from '../models/post.model.js'
import * as postsRepo from '../repositories/posts.repository.js'
import { v4 as uuidv4 } from 'uuid'

export const getPosts = async () => {
  return await postsRepo.getPosts()
}

export const createPost = async (postData: CreatePostRequest) => {
  const postId = uuidv4()
  
  const newPost: Post = {
    _id: postId,
    ...postData,
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  }

  return await postsRepo.createPost(newPost)
}