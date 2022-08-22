/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient as PrismaClient1 } from '@prisma/client'
import { PrismaClient as PrismaClient2 } from '../../prisma/generated/client2'


declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient1;
    }
  }
}

let prisma: PrismaClient1;

if (!global.prisma) {
  global.prisma = new PrismaClient1({
    log: ["info"],
  });
}
prisma = global.prisma;

export const nrgprisma = new PrismaClient2()

export default prisma;