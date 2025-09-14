import Fastify from 'fastify'
import postsRoutes from './routes/posts.route.js'
import mongoPlugin from './database/mongo.js'
import cors from '@fastify/cors'
import commentsRoutes from './routes/comments.route.js'

const app = Fastify()

await app.register(cors, {
  origin: '*',
  methods: ['*'],
  allowedHeaders: ['*'],
})

await app.register(mongoPlugin)

app.register(postsRoutes, { prefix: '/posts' })
app.register(commentsRoutes, { prefix: '/comments' })

app.get('/', async (request, reply) => {
  return { message: 'Hello world!' }
})

export default app