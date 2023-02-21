import { NextApiRequest, NextApiResponse } from "next";
import { Colors, EmbedBuilder } from "discord.js";
import { env } from "../../../env";
import { discordWebhook } from "@libs/webhook";
import { format } from "date-fns";

const STRAPI_EVENT_TYPES = {
  record: {
    color: Colors.Blurple,
  },
  fate_board: {
    color: Colors.Blue,
  },
  premium_summons: {
    color: Colors.Purple,
  },
  weekly_summons: {
    color: Colors.DarkPurple,
  },
  monthly_summons: {
    color: Colors.DarkPurple,
  },
  abyss_tower: {
    color: Colors.DarkBlue,
  },
  variation: {
    color: Colors.Green,
  },
  anecdote: {
    color: Colors.Yellow,
  },
  campaign: {
    color: Colors.White,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const event = req.body;
      const entry = event.entry;

      if (!env.DISCORD_EVENTS_WEBHOOK_URL) {
        return console.warn(
          "Missing optional env var: DISCORD_EVENTS_WEBHOOK_URL"
        );
      }

      if (!event.model === "event") {
        return console.warn("STRAPI: unsupported event type", event);
      }

      const embed = new EmbedBuilder()
        .setTitle(`We published a new guide for: ${entry.title}`)
        .setURL(`https://nierrein.guide/event/${entry.slug}`)
        .setImage(entry.image.url)
        .setTimestamp(new Date(entry.updatedAt))
        .setColor(STRAPI_EVENT_TYPES[entry.type].color ?? Colors.Blurple);

      const startDate = format(new Date(entry.start_date), "d MMM yyyy");
      const endDate = format(new Date(entry.end_date), "d MMM yyyy");
      let description = `Event period: ${startDate} - ${endDate}`;

      if (entry.gems > 0) {
        description += `\nTotal gems obtainable: <:gem:1069908865891704842> ${entry.gems}`;
      }

      embed.setDescription(description);

      await discordWebhook.send({
        embeds: [embed],
      });

      return res.status(200).json(entry);
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
