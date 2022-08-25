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

let nrgprisma: PrismaNRG = global.nrgprisma || new PrismaNRG({
  datasources: {
    db: {
      url: process.env.NIERREINGUIDE_DATABASE_URL,
    }
  },
  log: ["info"],
})

export default prisma;
export {
  nrgprisma
}