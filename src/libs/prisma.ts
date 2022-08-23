/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient as PrismaDump } from '@prisma/client'
import { PrismaClient as PrismaNRG } from '@prisma/client-nrg'


declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaDump;
    }
  }
}

let prisma: PrismaDump;

if (!global.prisma) {
  global.prisma = new PrismaDump({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      }
    },
    log: ["info"],
  });
}
prisma = global.prisma;

export const nrgprisma = new PrismaNRG({
  datasources: {
    db: {
      url: process.env.NIERREINGUIDE_DATABASE_URL,
    }
  },
  log: ["info"],
})

export default prisma;