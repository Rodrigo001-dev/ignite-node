import request from 'supertest'
import { FastifyInstance } from 'fastify'

import { createOrg } from './create-org'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await createOrg()

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@email.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
