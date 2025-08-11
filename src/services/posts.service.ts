import * as postsRepo from '../repositories/posts.repository.js'

export const getPosts = async () => {
  return await postsRepo.getPosts()
}

export const createPost = async (postData: any) => {
  const newPost = {
    id: Date.now(),
    ...postData,
  }
  return await postsRepo.createPost(newPost)
}