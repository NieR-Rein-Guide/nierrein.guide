import prisma from "@libs/prisma";

export default async function alterCostumeToAddWeapon(costume) {
  const link = await prisma.nrg.costumes_link.findUnique({
    where: {
      costume_id: costume.costume_id
    }
  })

  if (!link) {
    costume.weapon = null;
    return
  }

  const weapon = await prisma.dump.weapon.findUnique({
    where: {
      weapon_id: link.weapon_id,
    }
  })

  costume.weapon = weapon
  }