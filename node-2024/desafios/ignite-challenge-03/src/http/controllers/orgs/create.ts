import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  })

  const { name, email, city, state, zipCode, address, phone, password } =
    createOrgBodySchema.parse(req.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  await createOrganizationUseCase.execute({
    city,
    state,
    zip_code: zipCode,
    email,
    address,
    phone,
    password,
    name,
  })

  return reply.status(201).send()
}
