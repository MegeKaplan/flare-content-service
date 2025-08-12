import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

let db: FastifyInstance['mongo']['db']

const mongoPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyMongo, {
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/flare_content_service',
    forceClose: true
  })
  db = fastify.mongo.db
}

export const getDb = () => {
  if (!db) throw new Error('Mongo is not initialized yet')
  return db
}

export default fastifyPlugin(mongoPlugin)