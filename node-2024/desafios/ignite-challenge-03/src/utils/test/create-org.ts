import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createOrg() {
  const id = '3f2def52-cff1-11ed-afa1-0242ac120002'

  const password = await hash('123456', 6)

  await prisma.org.create({
    data: {
      id,
      zip_code: '15110-000',
      city: 'city',
      state: 'SP',
      email: 'org@email.com',
      password,
      phone: '99999999',
      address: 'New Address',
      name: 'Org',
    },
  })
}
