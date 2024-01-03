import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeSearchPetsByParamsUseCase } from '@/use-cases/factories/make-search-pets-by-params-use-case'

export async function searchByParams(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchByParamsQueryParams = z.object({
    property: z.enum(['energy_level', 'size']),
    value: z.string().min(1),
    page: z.coerce.number().min(1).default(1),
  })

  const { property, value, page } = searchByParamsQueryParams.parse(
    request.query,
  )

  if (property === 'size') {
    if (!['small', 'medium', 'large'].includes(value.toLowerCase())) {
      return reply.status(400).send({
        message: 'Invalid value for property size',
      })
    }
  }

  try {
    const searchPetsByParamsUseCase = makeSearchPetsByParamsUseCase()

    const { pets } = await searchPetsByParamsUseCase.execute(
      { property, value },
      page,
    )

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    throw error
  }
}
