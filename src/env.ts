import { envsafe, str } from "envsafe";

export const env = envsafe({
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'production']
  }),
  S3_ACCESS_KEY: str({
    docs: 'https://discord.com/channels/877257901146775603/877323861123809300/879707546372440104',
  }),
  S3_SECRET_KEY: str({
    docs: 'https://discord.com/channels/877257901146775603/877323861123809300/879707546372440104',
  }),
  S3_ENDPOINT: str({
    default: 's3.eu-central-1.wasabisys.com'
  }),
  NEXT_PUBLIC_API_ENDPOINT: str({
    default: 'https://strapi.nierrein.guide/',
  }),
  NEXT_PUBLIC_GRAPHQL_API_ENDPOINT: str({
    default: 'https://strapi.nierrein.guide/graphql',
  }),
  DATABASE_URL: str({
    desc: 'Dump database (weapons, costumes...)',
  }),
  NIERREINGUIDE_DATABASE_URL: str({
    desc: 'Main database (loadouts...)'
  }),
})