import { FastifyInstance } from 'fastify'
import * as commentsController from '../controllers/comments.controller.js'

const commentsRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', commentsController.getComments)
  fastify.get('/:id', commentsController.getCommentById)
  fastify.post('/', commentsController.createComment)
}

export default commentsRoutes