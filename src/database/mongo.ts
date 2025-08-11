import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function mongoPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/flare_content_service',
    forceClose: true
  })
}

export default fastifyPlugin(mongoPlugin)