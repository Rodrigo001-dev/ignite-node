import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new RegisterPetUseCase(petsRepository)

  return useCase
}
