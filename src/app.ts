import Fastify from 'fastify'

const app = Fastify()

app.get('/', async (request, reply) => {
  return { message: 'Hello world!' }
})

export default app