import app from "./app.js"
import { env } from './config/env.js'

const startServer = async () => {
  try {
    await app.listen({
      port: Number(env.PORT),
      host: "0.0.0.0"
    })
    console.log(`Server is running on http://localhost:${env.PORT}`);
  } catch (error) {
    console.error(error)
  }
}

startServer()