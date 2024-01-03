import { describe, it, expect, beforeEach } from 'vitest'

import { CreateOrganizationUseCase } from './create-organization'
import { EntityAlreadyExistsError } from './errors/entity-already-exists-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let sut: CreateOrganizationUseCase
let orgsRepository: InMemoryOrgsRepository

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrganizationUseCase(orgsRepository)
  })

  it('should be able to create an organization', async () => {
    const { organization } = await sut.execute({
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      password: '123456',
      email: 'org@email.com',
      phone: '99999999',
      address: 'New Address',
      name: 'Org',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create two orgs with the same email', async () => {
    const email = 'org@email.com'

    await sut.execute({
      email,
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      password: '123456',
      phone: '99999999',
      address: 'New Address',
      name: 'Org',
    })

    await expect(() =>
      sut.execute({
        email,
        zip_code: '15110-000',
        city: 'city',
        state: 'SP',
        password: '123456',
        phone: '99999999',
        address: 'New Address',
        name: 'Org',
      }),
    ).rejects.toBeInstanceOf(EntityAlreadyExistsError)
  })
})
