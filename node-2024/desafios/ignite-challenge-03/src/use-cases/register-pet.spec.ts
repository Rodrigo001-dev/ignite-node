import { describe, expect, it, beforeEach } from 'vitest'

import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register pet', async () => {
    const org = await orgsRepository.create({
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      password: '123456',
      email: 'org@email.com',
      phone: '99999999',
      address: 'New Address',
      name: 'Org',
    })

    const { pet } = await sut.execute({
      name: 'Pet name',
      about: 'Pet about',
      age: 2,
      energy_level: '2',
      size: 'MEDIUM',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(org.id)
  })
})
