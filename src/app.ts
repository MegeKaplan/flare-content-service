import Fastify from 'fastify'
import postsRoutes from './routes/posts.route.js'

const app = Fastify()

app.register(postsRoutes, { prefix: '/posts' })

app.get('/', async (request, reply) => {
  return { message: 'Hello world!' }
})

export default app