import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export function CurrentRelease() {
  const {
    data: releases,
    error,
    isLoading,
  } = useSWR(
    "https://api.github.com/repos/NieR-Rein-Guide/nierrein.guide/releases?per_page=1?page=1",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <span>Fetching latest release...</span>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (releases) {
    const release = releases[0];
    return (
      <Link
        href="https://github.com/NieR-Rein-Guide/nierrein.guide/releases/"
        passHref
      >
        <a title="See releases" className="hover:underline">
          {release.tag_name}
          <span className="hidden sm:inline md:text-sm">
            - Published{" "}
            {formatDistanceToNow(new Date(release.published_at), {
              addSuffix: true,
            })}
          </span>
        </a>
      </Link>
    );
  }
}
