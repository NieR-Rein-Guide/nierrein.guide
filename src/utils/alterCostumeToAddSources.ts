import prisma from "@libs/prisma";
import { getEventById } from "@models/event";
import { Prisma } from "@prisma/client";

export default async function alterCostumeToAddSources(costume) {
  const link = await prisma.nrg.costumes_link.findUnique({
    where: {
      costume_id: costume.costume_id
    }
  })

  const linkedEvents = link?.events as Prisma.JsonArray

  if (!link || linkedEvents?.length === 0) {
    costume.sources = [];
    return
  }

  const sources = await Promise.all(
    linkedEvents.map((id: number) => getEventById(id))
  )

  costume.sources = sources
  }