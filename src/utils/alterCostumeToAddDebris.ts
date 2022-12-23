import prisma from "@libs/prisma";

export default async function alterCostumeToAddDebris(costume) {
  const link = await prisma.nrg.costumes_link.findUnique({
    where: {
      costume_id: costume.costume_id
    }
  })

  if (!link || !link.debris_id) {
    costume.debris = null;
    return
  }

  const debris = await prisma.dump.debris.findUnique({
    where: {
      debris_id: link.debris_id,
    }
  })

  costume.debris = debris
  }