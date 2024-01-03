import { prisma } from '@/lib/prisma'

export async function createOrgAndPet() {
  const petId = '5444ca02-d02a-11ed-afa1-0242ac120002'
  const orgId = '5f2def52-cff1-11ed-afa1-0242ac120002'

  await prisma.org.create({
    data: {
      id: orgId,
      name: 'Org Name',
      address: 'Ong Address',
      city: 'Org City',
      email: 'orgmail@example.com',
      password: '123456',
      phone: '999999999',
      state: 'SP',
      zip_code: '15110-000',
    },
  })

  await prisma.pet.create({
    data: {
      id: petId,
      age: 2,
      name: 'Pet name',
      energy_level: '1',
      size: 'MEDIUM',
      org_id: orgId,
    },
  })
}
