import prisma from "@libs/prisma";

export default async function alterWeaponToAddCostume(weapon) {
  const link = await prisma.nrg.costumes_link.findFirst({
    where: {
      weapon_id: weapon.weapon_id
    }
  })

  if (!link) {
    weapon.costume = null;
    return
  }

  const costume = await prisma.dump.costume.findUnique({
      where: {
      costume_id: link.costume_id
    },
    include: {
      character: true,
    }
  })

  weapon.costume = costume
  }