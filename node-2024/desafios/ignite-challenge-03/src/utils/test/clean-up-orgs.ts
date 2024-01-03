import { prisma } from '@/lib/prisma'

export async function cleanUpOrgs() {
  return await prisma.org.deleteMany()
}
