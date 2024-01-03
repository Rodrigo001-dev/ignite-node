import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFindPetByOrgIdUseCase } from '@/use-cases/factories/make-find-pet-by-org-id-use-case'

export async function findByOrgId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findByOrgIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const findByOrgIdQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { id } = findByOrgIdParamsSchema.parse(request.params)
  const { page } = findByOrgIdQuerySchema.parse(request.query)

  try {
    const findPetByOrgIdUseCase = makeFindPetByOrgIdUseCase()

    const { pets } = await findPetByOrgIdUseCase.execute(id, page)

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    throw error
  }
}
