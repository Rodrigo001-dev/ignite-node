import { hash } from 'bcryptjs'
import type { Org } from '@prisma/client'

import { EntityAlreadyExistsError } from './errors/entity-already-exists-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface CreateOrganizationUseCaseRequest {
  city: string
  state: string
  zip_code: string
  address: string
  email: string
  phone: string
  password: string
  name: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Org
}

export class CreateOrganizationUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
    state,
    zip_code,
    email,
    address,
    password,
    phone,
    name,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (org) {
      throw new EntityAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.orgsRepository.create({
      city,
      state,
      zip_code,
      email,
      address,
      phone,
      name,
      password: password_hash,
    })

    return { organization }
  }
}
