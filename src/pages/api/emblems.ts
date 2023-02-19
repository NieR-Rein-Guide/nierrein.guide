import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const emblems = await prisma.dump.emblem.findMany({
        orderBy: {
          emblem_id: "asc",
        },
      });

      return res.status(200).json(emblems);
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
