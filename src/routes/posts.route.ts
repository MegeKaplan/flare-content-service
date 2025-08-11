import { FastifyInstance } from 'fastify'
import * as postsController from '../controllers/posts.controller.js'

async function postsRoutes(fastify: FastifyInstance) {
  fastify.get('/', postsController.getPosts)
  fastify.post('/', postsController.createPost)
}

export default postsRoutes