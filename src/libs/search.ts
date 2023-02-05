import { MeiliSearch } from "meilisearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

export const meiliSearch = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_SEARCH_ENDPOINT,
  apiKey: process.env.NEXT_PUBLIC_SEARCH_TOKEN,
});

export const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_SEARCH_ENDPOINT,
  process.env.NEXT_PUBLIC_SEARCH_TOKEN
);
