import { CreateOrganizationUseCase } from '../create-organization'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrganizationUseCase(organizationsRepository)

  return useCase
}
