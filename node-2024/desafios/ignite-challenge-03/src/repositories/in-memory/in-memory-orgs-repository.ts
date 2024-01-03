import { randomUUID } from 'node:crypto'
import type { Prisma, Org } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const organization = {
      id: randomUUID(),
      zip_code: data.zip_code,
      city: data.city,
      state: data.state,
      email: data.email,
      address: data.address,
      password: data.password,
      phone: data.phone,
      name: data.name,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
