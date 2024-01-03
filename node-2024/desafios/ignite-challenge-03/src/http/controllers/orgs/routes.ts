import { FastifyInstance } from 'fastify'

import { create } from './create'
import { refresh } from './refresh'
import { authenticate } from './authenticate'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)

  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
