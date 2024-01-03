import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFindPetByCityUseCase } from '@/use-cases/factories/make-find-pet-by-city-use-case'

export async function findByCity(request: FastifyRequest, reply: FastifyReply) {
  const findByCityQuerySchema = z.object({
    city: z.string().min(2).toLowerCase(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = findByCityQuerySchema.parse(request.query)

  try {
    const findPetByCityUseCase = makeFindPetByCityUseCase()

    const { pets } = await findPetByCityUseCase.execute(city, page)

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    throw error
  }
}
