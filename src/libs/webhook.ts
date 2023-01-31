import { WebhookClient } from "discord.js";
import { env } from '../env'

export const discordWebhook = new WebhookClient({
  url: env.DISCORD_EVENTS_WEBHOOK_URL,
})
