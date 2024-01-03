import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      zipCode: '15110-000',
      city: 'city',
      state: 'state',
      password: '123456',
      email: 'org@email.com',
      phone: '999999999',
      address: 'address',
      name: 'Org Responsible',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'org@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
