import { PetsRepository, SearchByParams } from '@/repositories/pets-repository'

export class SearchPetsByParams {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ property, value }: SearchByParams, page: number) {
    const pets = await this.petsRepository.searchByParams(
      { property, value },
      page,
    )
    return { pets }
  }
}
