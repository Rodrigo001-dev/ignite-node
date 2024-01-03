import { PetsRepository } from '@/repositories/pets-repository'

export class FindPetByOrgId {
  constructor(private petsRepository: PetsRepository) {}

  async execute(org_id: string, page: number) {
    const pets = await this.petsRepository.findByOrgId(org_id, page)

    return { pets }
  }
}
