import { SearchPetsByParams } from '../search-pets-by-params'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeSearchPetsByParamsUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new SearchPetsByParams(petsRepository)

  return useCase
}
