import Fastify from 'fastify'
import postsRoutes from './routes/posts.route.js'
import mongoPlugin from './database/mongo.js'
import cors from '@fastify/cors'

const app = Fastify()

await app.register(cors, {
  origin: '*',
  methods: ['*'],
  allowedHeaders: ['*'],
})

await app.register(mongoPlugin)

app.register(postsRoutes, { prefix: '/posts' })

app.get('/', async (request, reply) => {
  return { message: 'Hello world!' }
})

export default app