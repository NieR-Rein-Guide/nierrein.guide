import { envsafe, str, url } from "envsafe";

export const env = envsafe({
  NODE_ENV: str({
    devDefault: "development",
    choices: ["development", "production"],
  }),

  /**
   * API
   */
  NEXT_PUBLIC_API_ENDPOINT: url({
    default: "https://strapi.nierrein.guide/",
  }),
  NEXT_PUBLIC_STRAPI_REST_API_ENDPOINT: url({}),

  /**
   * Search
   */
  NEXT_PUBLIC_SEARCH_ENDPOINT: url({
    default: "https://search.nierrein.guide",
  }),

  /**
   * Databases
   */
  DATABASE_URL: str({
    desc: "Dump database (weapons, costumes...)",
  }),
  NIERREINGUIDE_DATABASE_URL: str({
    desc: "Main database (loadouts...)",
  }),

  /**
   * Post new events on Discord
   */
  DISCORD_EVENTS_WEBHOOK_URL: url({}),
  DISCORD_TIERLISTS_UPDATE_CHANNEL_WEBHOOK: url({}),
});
