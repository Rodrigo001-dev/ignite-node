import { FastifyInstance } from 'fastify'

import { register } from './register'
import { findByCity } from './find-by-city'
import { findByOrgId } from './find-by-org-id'
import { searchByParams } from './search-by-params'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/org/:id', findByOrgId)
  app.get('/pets', findByCity)
  app.get('/pets/search', searchByParams)

  // Authenticated routes
  app.post('/pets', { onRequest: [verifyJWT] }, register)
}
