import { FastifyInstance } from 'fastify'
import * as postsController from '../controllers/posts.controller.js'

async function postsRoutes(fastify: FastifyInstance) {
  fastify.get('/', postsController.getPosts)
  fastify.get('/:id', postsController.getPostById)
  fastify.post('/', postsController.createPost)
}

export default postsRoutes