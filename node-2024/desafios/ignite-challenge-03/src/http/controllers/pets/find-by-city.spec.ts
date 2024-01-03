import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'

describe('Find By City (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to find pet by city', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'

    await createOrgAndPet()

    const response = await request(app.server)
      .get(`/pets`)
      .query({
        page: 1,
        city: 'Org City',
      })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        pets: [
          expect.objectContaining({
            id: petId,
          }),
        ],
      }),
    )
  })
})
