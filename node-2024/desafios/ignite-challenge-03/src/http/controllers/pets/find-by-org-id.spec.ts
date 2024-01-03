import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createOrgAndPet } from '@/utils/test/create-org-and-pet'

describe('Find pet By Org Id (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })

  it('should be able to find pet by org id', async () => {
    const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'
    const orgId = '5f2def52-cff1-11ed-afa1-0242ac120002'

    await createOrgAndPet()

    const response = await request(app.server)
      .get(`/pets/org/${orgId}`)
      .query({
        page: 1,
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
