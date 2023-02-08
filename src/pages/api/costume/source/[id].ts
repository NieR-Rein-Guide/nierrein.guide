import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import { getEventById } from "@models/event";
import { Prisma } from "@prisma/client-nrg";

export interface CostumeLink {
  costume_id?: number;
  weapon_id?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      if (!id) {
        return res.status(400).json({
          error: "Missing id.",
        });
      }

      const link = await prisma.nrg.costumes_link.findUnique({
        where: {
          costume_id: Number(id),
        },
      });

      const linkedEvents = link?.events as Prisma.JsonArray;

      if (!link || linkedEvents?.length === 0) {
        return res.status(200).json([]);
      }

      const sources = await Promise.all(
        linkedEvents.map((id: number) => getEventById(id))
      );

      return res.status(200).json(sources);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
