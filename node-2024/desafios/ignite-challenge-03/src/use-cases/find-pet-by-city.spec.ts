import { describe, expect, it, beforeEach } from 'vitest'

import { FindPetByCityUseCase } from './find-pet-by-city'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindPetByCityUseCase

describe('Find Pet By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindPetByCityUseCase(petsRepository)
  })

  it('should be able to find pet by city', async () => {
    const createOrg = await orgsRepository.create({
      name: 'Org Name',
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      password: '123456',
      email: 'org@email.com',
      phone: '99999999',
      address: 'New Address',
    })
    petsRepository.petsAndOrgs.push({
      id: 'efae2dfb-57d0-44f6-8869-0e0678f73c3e',
      name: 'Pet Name',
      about: 'Pet about',
      energy_level: '1',
      age: 2,
      size: 'SMALL',
      organization: createOrg,
      org_id: createOrg.id,
      created_at: new Date(),
    })

    const { pets } = await sut.execute(createOrg.city, 1)

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('Should be able to return an empty list of pets per city if there is no organization in the city', async () => {
    expect(() => sut.execute('wrong-city', 1)).toEqual(
      expect.arrayContaining([]),
    )
  })
})
