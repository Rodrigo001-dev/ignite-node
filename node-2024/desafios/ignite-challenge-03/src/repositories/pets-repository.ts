import { Pet, Prisma } from '@prisma/client'

export interface SearchByParams {
  property: 'energy_level' | 'size'
  value: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByOrgId(orgId: string, page: number): Promise<Pet[] | null>
  searchByParams(query: SearchByParams, page: number): Promise<Pet[]>
  findByCity(city: string, page: number): Promise<Pet[] | null>
}
