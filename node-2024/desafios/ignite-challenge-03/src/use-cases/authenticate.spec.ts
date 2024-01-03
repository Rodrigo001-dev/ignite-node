import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let sut: AuthenticateUseCase
let orgsRepository: InMemoryOrgsRepository

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      email: 'org@email.com',
      phone: '99999999',
      address: 'Avenida Paulista',
      password: await hash('123456', 6),
      name: 'Org',
    })

    const { organization } = await sut.execute({
      password: '123456',
      email: 'org@email.com',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        password: '123456',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      email: 'org@email.com',
      phone: '99999999',
      address: 'Avenida Paulista',
      password: await hash('123456', 6),
      name: 'Org',
    })

    await expect(() =>
      sut.execute({
        password: '654321',
        email: 'org@email.com',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
