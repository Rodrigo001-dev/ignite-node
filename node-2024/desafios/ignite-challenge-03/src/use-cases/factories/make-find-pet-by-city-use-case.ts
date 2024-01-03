import { FindPetByCityUseCase } from '../find-pet-by-city'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFindPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new FindPetByCityUseCase(petsRepository)

  return useCase
}
