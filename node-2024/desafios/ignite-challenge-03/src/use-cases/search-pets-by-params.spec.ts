import { describe, expect, it, beforeEach } from 'vitest'

import { SearchPetsByParams } from './search-pets-by-params'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsByParams

describe('Search Pets By Params', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetsByParams(petsRepository)
  })

  it('should be able to search pets by params', async () => {
    const orgCreate = await orgsRepository.create({
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      password: '123456',
      email: 'org@email.com',
      phone: '99999999',
      address: 'New Address',
      name: 'Org',
    })
    const petCreate = await petsRepository.create({
      name: 'Pet name',
      about: 'Pet about',
      age: 2,
      energy_level: '2',
      size: 'MEDIUM',
      org_id: orgCreate.id,
    })

    const { pets } = await sut.execute(
      {
        property: 'energy_level',
        value: petCreate.energy_level,
      },
      1,
    )

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('should be able to return an empty pet list when searching for pets by sending values that do not match a param of a registered pet', async () => {
    const orgCreate = await orgsRepository.create({
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
      org_id: orgCreate.id,
    })

    const { pets } = await sut.execute(
      {
        property: 'energy_level',
        value: 'wrong_value',
      },
      1,
    )

    expect(pets).toEqual(expect.arrayContaining([]))
  })

  it('should not be able to search pets by param with wrong property', async () => {
    const orgCreate = await orgsRepository.create({
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
      org_id: orgCreate.id,
    })

    await expect(() =>
      sut.execute(
        {
          property: 'wrong_property' as any,
          value: 'wrong_value',
        },
        1,
      ),
    ).rejects.toThrow()
  })
})
