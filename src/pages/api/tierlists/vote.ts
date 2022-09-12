import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * VOTE FOR TIERLIST
   */
  if (req.method === 'POST') {
    try {
      const {
        tierlist_id,
      } = req.body

      if (!tierlist_id) {
        return res.status(400).json({
          error: 'Missing "tierlist_id".',
        })
      }

      const response = await prisma.nrg.tierlists.update({
        where: { tierlist_id },
        data: { votes: { increment: 1 }}
      })

      return res.status(200).json(response)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}