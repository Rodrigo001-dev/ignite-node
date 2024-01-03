import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an organization', async () => {
    const response = await request(app.server).post('/orgs').send({
      city: 'city',
      state: 'SP',
      zipCode: '15110-000',
      password: '123456',
      email: 'org@email.com',
      phone: '999999999',
      address: 'Address',
      name: 'Org',
    })

    expect(response.statusCode).toEqual(201)
  })
})
