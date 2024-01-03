import type { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PetsRepository, SearchByParams } from '../pets-repository'
import { PetSelectDTO } from '../dtos/pet-select-dto'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByOrgId(orgId: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        org_id: orgId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }

  async searchByParams({ property, value }: SearchByParams, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        [property]: {
          equals: value.toUpperCase(),
        },
      },

      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findByCity(city: string, page: number) {
    const pets = await prisma.$queryRaw<PetSelectDTO[]>`
    SELECT "pets".*
    FROM "pets"
    INNER JOIN "orgs" ON "pets"."org_id" = "orgs"."id"
    WHERE translate(lower("orgs"."city"), 'áàâãäéèêëíìîïóòôõöúùûü', 'aaaaaeeeeiiiiooooouuuu') = ${city}
    LIMIT 20
    OFFSET ${(page - 1) * 20}
  `
    return pets
  }
}
