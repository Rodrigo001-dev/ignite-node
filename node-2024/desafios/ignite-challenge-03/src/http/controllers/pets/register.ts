import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeRegisterUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2),
    about: z.string().min(5),
    age: z.number(),
    energy_level: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    org_id: z.string().uuid(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute(data)
  } catch (error) {
    throw error
  }

  return reply.status(201).send()
}
