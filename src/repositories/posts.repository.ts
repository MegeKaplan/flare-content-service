const posts: any[] = []

export const getPosts = async () => {
  return posts
}

export const createPost = async (postData: any) => {
  posts.push(postData)
  return postData
}