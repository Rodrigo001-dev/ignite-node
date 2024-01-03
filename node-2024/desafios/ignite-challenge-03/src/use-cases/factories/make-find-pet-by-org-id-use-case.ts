import { FindPetByOrgId } from '../find-pet-by-org-id'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFindPetByOrgIdUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new FindPetByOrgId(petsRepository)

  return useCase
}
