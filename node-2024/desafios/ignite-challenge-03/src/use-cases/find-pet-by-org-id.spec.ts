import { describe, expect, it, beforeEach } from 'vitest'

import { FindPetByOrgId } from './find-pet-by-org-id'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindPetByOrgId

describe('Find Pet By Org Id Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindPetByOrgId(petsRepository)
  })

  it('should be able to find pet by org id', async () => {
    const createOrg = await orgsRepository.create({
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      password: '123456',
      email: 'org@email.com',
      phone: '99999999',
      address: 'New Address',
      name: 'Org',
    })
    await petsRepository.create({
      name: 'Pet name',
      about: 'Pet about',
      age: 2,
      energy_level: '2',
      size: 'MEDIUM',
      org_id: createOrg.id,
    })

    const { pets } = await sut.execute(createOrg.id, 1)

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })
})
