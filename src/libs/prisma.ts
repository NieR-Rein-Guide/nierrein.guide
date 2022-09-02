/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient as PrismaDump } from '@prisma/client'
import { PrismaClient as PrismaNRG } from '@prisma/client-nrg'
import { env } from '../env'


const prisma = {
  dump: new PrismaDump({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      }
    },
    log: ["info"],
  }),
  nrg: new PrismaNRG({
    datasources: {
      db: {
        url: env.NIERREINGUIDE_DATABASE_URL,
      }
    },
    log: ["info"],
  })
};

Object.freeze(prisma);

export default prisma;