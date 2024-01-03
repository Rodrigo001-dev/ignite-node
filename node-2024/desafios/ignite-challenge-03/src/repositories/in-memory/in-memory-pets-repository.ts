import type { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository, SearchByParams } from '../pets-repository'
import { PetSelectDTO } from '../dtos/pet-select-dto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  public petsAndOrgs: PetSelectDTO[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      org_id: data.org_id,
      created_at: new Date(),
    } as Pet

    this.pets.push(pet)

    return pet
  }

  async findByOrgId(orgId: string, page: number): Promise<Pet[] | null> {
    const pets = this.pets
      .filter((pet) => pet.org_id === orgId)
      .slice((page - 1) * 20, page * 20)

    if (!pets) {
      return null
    }

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchByParams(
    { property, value }: SearchByParams,
    page: number,
  ): Promise<Pet[]> {
    return this.pets
      .filter((pet) => pet[property].includes(value))
      .slice((page - 1) * 20, page * 20)
  }

  async findByCity(city: string, page: number): Promise<Pet[] | null> {
    const pets = this.petsAndOrgs
      .filter((pet) => pet.organization.city === city)
      .slice((page - 1) * 20, page * 20)

    if (!pets) {
      return null
    }

    return pets
  }
}
