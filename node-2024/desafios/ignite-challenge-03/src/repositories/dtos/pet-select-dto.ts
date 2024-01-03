import type { Org, Pet } from '@prisma/client'

export interface PetSelectDTO extends Pet {
  organization: Org
}
