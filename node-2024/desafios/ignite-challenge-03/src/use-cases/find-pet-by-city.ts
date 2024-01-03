import { PetsRepository } from '@/repositories/pets-repository'

export class FindPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(city: string, page: number) {
    city = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const pets = await this.petsRepository.findByCity(city, page)

    return { pets }
  }
}
