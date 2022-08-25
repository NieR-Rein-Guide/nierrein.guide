/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient as PrismaDump } from '@prisma/client'
import { PrismaClient as PrismaNRG } from '@prisma/client-nrg'


declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaDump;
      nrgprisma: PrismaNRG;
    }
  }
}

let prisma: PrismaDump = global.prisma || new PrismaDump({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    }
  },
  log: ["info"],
})

export let nrgprisma: PrismaNRG = global.nrgprisma || new PrismaNRG({
  datasources: {
    db: {
      url: process.env.NIERREINGUIDE_DATABASE_URL,
    }
  },
  log: ["info"],
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
if (process.env.NODE_ENV !== 'production') global.nrgprisma = nrgprisma

export default prisma;