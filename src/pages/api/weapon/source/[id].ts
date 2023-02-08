import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import { GLOBAL_RELEASE_DATE } from "@config/constants";
import { add, sub } from "date-fns";
import { objectToURLSearchParams } from "@studiometa/js-toolkit/utils";
import axios from "axios";
import { env } from "../../../../env";

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

      const weapon = await prisma.dump.weapon.findUnique({
        where: {
          weapon_id: Number(id),
        },
      });

      console.log(weapon);

      let sources = [];

      /**
       * Only weapons released after global release date because we don't want to link events to release stuff
       */
      if (weapon.release_time > GLOBAL_RELEASE_DATE) {
        const releaseTimeGte = sub(weapon.release_time, { hours: 8 });
        const releaseTimeLte = add(releaseTimeGte, { days: 1 });

        const filters = {
          populate: "*",
          filters: {
            start_date: {
              $gte: releaseTimeGte.toISOString(),
              $lte: releaseTimeLte.toISOString(),
            },
          },
        };
        const qs = objectToURLSearchParams(filters);

        const { data } = await axios.get(
          `${env.NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT}/events?${qs}`
        );

        sources = data.data;
      }

      return res.status(200).json(sources);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
