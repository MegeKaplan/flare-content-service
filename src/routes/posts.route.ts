import { FastifyInstance } from 'fastify'
import * as postsController from '../controllers/posts.controller.js'

const postsRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', postsController.getPosts)
  fastify.get('/:id', postsController.getPostById)
  fastify.post('/', postsController.createPost)
  fastify.put('/:id', postsController.updatePostById)
  fastify.delete('/:id', postsController.deletePostById)
}

export default postsRoutes