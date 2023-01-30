import prisma from "@libs/prisma";
import { Event } from "@models/types";

export default async function alterEventToAddCostumes(event: Event) {
  const linked = await prisma.nrg.costumes_link.findMany({
    where: {
      events: {
        array_contains: [Number(event.id)],
      },
    },
  });

  const costumes = await prisma.dump.costume.findMany({
    where: {
      costume_id: {
        in: linked.map((link) => link.costume_id),
      },
    },
    include: {
      character: true,
    },
  });

  if (!costumes || costumes?.length === 0) {
    event.costumes = [];
    return
  }


  event.costumes = costumes
}