import { CreatePostRequest } from '../dtos/create-post.dto.js'
import { GetPostsQuery } from '../dtos/get-posts-dto.js'
import { Post } from '../models/post.model.js'
import * as postsRepo from '../repositories/posts.repository.js'
import { UUIDTypes, v4 as uuidv4 } from 'uuid'

export const getPosts = async (query: GetPostsQuery) => {
  const options = {
    skip: query.offset ? parseInt(query.offset, 10) : 0,
    limit: query.limit ? parseInt(query.limit, 10) : 20,
    sortBy: query.sortBy || 'createdAt',
    sortDir: (query.sortOrder === 'asc' ? 1 : -1) as 1 | -1
  }

  return await postsRepo.getPosts(query, options)
}

export const getPostById = async (id: UUIDTypes) => {
  return await postsRepo.findPostById(id)
}

export const createPost = async (postData: CreatePostRequest) => {
  const postId = uuidv4()

  const newPost: Post = {
    id: postId,
    ...postData,
    createdAt: new Date(),
  }

  return await postsRepo.createPost(newPost)
}

export const updatePostById = async (id: UUIDTypes, postData: Partial<Post>) => {
  const updatedPost: Partial<Post> = {
    ...postData,
    updatedAt: new Date(),
  }

  return await postsRepo.updatePostById(id, updatedPost)
}

export const deletePostById = async (id: UUIDTypes, hard = false) => {
  if (hard) {
    return await postsRepo.deletePostById(id)
  }
  return await postsRepo.updatePostById(id, { deletedAt: new Date() })
}