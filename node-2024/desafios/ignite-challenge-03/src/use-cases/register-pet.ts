import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: number
  energy_level: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  org_id: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    energy_level,
    size,
    org_id,
  }: RegisterPetUseCaseRequest) {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy_level,
      size,
      org_id,
    })

    return { pet }
  }
}
