import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { cleanUpOrgs } from '@/utils/test/clean-up-orgs'

describe('Register pet (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to register pet', async () => {
    const orgId = '3f2def52-cff1-11ed-afa1-0242ac120002'

    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet name',
        about: 'Pet about',
        age: 2,
        energy_level: '2',
        size: 'MEDIUM',
        org_id: orgId,
      })

    expect(response.status).toEqual(201)
  })

  it('should not be able to register pet with invalid org id', async () => {
    await cleanUpOrgs()

    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet name',
        about: 'Pet about',
        age: 2,
        energy_level: '2',
        size: 'MEDIUM',
        org_id: '5444ca02-d02a-11ed-afa1-0242ac120002',
      })

    expect(response.status).toEqual(500)
  })
})
