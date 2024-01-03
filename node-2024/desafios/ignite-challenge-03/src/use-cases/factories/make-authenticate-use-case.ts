import { AuthenticateUseCase } from '../authenticate'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return authenticateUseCase
}
