![Cover](./public/cover.jpg)

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/NieR-Rein-Guide/nierrein.guide/Sanity%20Checks/main?label=lint&style=flat-square)

<p>
  <img src="https://img.shields.io/github/milestones/progress-percent/NieR-Rein-Guide/nierrein.guide/1?label=Alpha%20progress&style=flat-square" alt="Alpha milestone progress">
  <img src="https://img.shields.io/github/milestones/progress-percent/NieR-Rein-Guide/nierrein.guide/3?label=Release%20progress&style=flat-square" alt="Release milestone progress">
</p>

# https://nierrein.guide/

This is the frontend of https://nierrein.guide/.

You can join our Discord server to chat and contribute : https://discord.gg/swgHJJdt7f

## Features

- Guides (How to...)
- Loadouts (presets of teams for PvE, PvP, Dungeons...)
- Tier lists (for PvE and PvP)
- Characters and their costumes
- Database (3D Model viewer and all datamined assets)
- Fan Content (Art, Videos, etc.)

## How to install the project ?

### Tech stack

#### Front-end

- [Next.js](https://nextjs.org/) (React)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

#### Back-end

- [Wasabi](https://wasabi.com/) (S3 storage, but cheaper)
- [Strapi](https://strapi.io/) (CMS)

### Requirements

- Node.js (>16.x)

1. Copy the `.env.example` file to `.env`

```
# The S3 API is used for the database page, to fetch 3D models folder architecture.
# @see src\libs\s3.ts
# OPTIONAL
# If you need READ ONLY keys please join the Discord and check the pins in #website.
S3_ACCESS_KEY=
S3_SECRET_KEY=

S3_DOMAIN=wasabisys.com
REGION=eu-central-1

# Public API endpoints
# @see src\libs\api.ts
NEXT_PUBLIC_API_ENDPOINT=https://strapi.nierrein.guide/
NEXT_PUBLIC_GRAPHQL_API_ENDPOINT=https://strapi.nierrein.guide/graphql

# The Discord Webhook URL to send data submissions to
# @see src\pages\submit-missing-data.tsx
DISCORD_WEBHOOK_URL_DATA_SUBMISSIONS=https://discord.com/api/webhooks/......
```

2. Install the dependencies via NPM

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Once you're done with the development, you can lint your code by running

```bash
npm run lint
```

```bash
npm run fix
```

## License

[MIT](./LICENSE)
