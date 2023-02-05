import { ICostume } from "@components/pages/costumes";
import { IWeapon } from "@components/pages/weapons";
import { meiliSearch } from "@libs/search";
import useSWR from "swr";

type Indexes = "costumes" | "weapons";

function fetcher<T extends Indexes = "costumes">(
  index: Indexes,
  search: string,
  limit = 24
) {
  return meiliSearch
    .index(index)
    .search<T extends "costumes" ? ICostume : IWeapon>(search, {
      limit,
    });
}

export function useSearch<T extends Indexes = "costumes">(
  index: Indexes,
  search: string
) {
  const { data, error, isLoading } = useSWR(
    () => (search.length > 0 ? [index, search] : null),
    ([index, search]) => fetcher<T>(index, search)
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
