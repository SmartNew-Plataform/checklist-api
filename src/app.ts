import fastify from 'fastify'
// import fs from 'fs'
// import proxy from '@fastify/http-proxy'
import routes from './routes'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { env } from './env'
import CustomError, { HttpStatusCode } from './config/CustomError'
import { ZodError } from 'zod'

// const keyContent = fs.readFileSync(env.KEY_PATH)
// const certContent = fs.readFileSync(env.CERT_PATH)

export const app = fastify({
  logger: true,
})

app.register(cors, {
  origin: env.ORIGIN,
})

app.register(fastifyJwt, {
  secret: env.KEY,
})

app.get('/', (req, res) => res.status(HttpStatusCode.NO_CONTENT).send(''))

app.register(routes)

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    console.error(error)
    return res.status(HttpStatusCode.BAD_REQUEST).send({
      message: 'Validation error ',
      error: error.issues.map((err) => {
        return {
          ...err,
          path: err.path[0],
        }
      }),
    })
  } else if (error instanceof CustomError) {
    if (error instanceof CustomError) {
      res
        .status(error.code)
        .send({ message: error.message, errors: error.errors })
    } else {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ error: 'Internal Server Error' })
    }
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.error(error)
    // TODO: here we should log
  }

  return res.status(500).send({ message: 'Internal server error' })
})
