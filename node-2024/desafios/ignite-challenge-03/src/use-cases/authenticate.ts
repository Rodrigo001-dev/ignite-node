import { compare } from 'bcryptjs'
import type { Org } from '@prisma/client'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Org
}
export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.orgsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, organization.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
