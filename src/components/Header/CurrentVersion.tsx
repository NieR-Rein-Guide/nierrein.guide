import { fetcher } from "@utils/fetcher";
import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import useSWR from "swr/immutable";

export function CurrentRelease({ className }: { className?: string }) {
  const {
    data: releases,
    error,
    isLoading,
  } = useSWR(
    "https://api.github.com/repos/NieR-Rein-Guide/nierrein.guide/releases?per_page=1?page=1",
    fetcher
  );

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (releases?.length > 0) {
    const release = releases[0];
    return (
      <Link
        href="https://github.com/NieR-Rein-Guide/nierrein.guide/releases/"
        passHref
        title={`See latest releases - This version has been published ${formatDistanceToNow(
          new Date(release?.published_at),
          {
            addSuffix: true,
          }
        )}`}
        className={classNames("hover:underline", className)}
      >
        {release?.tag_name}
      </Link>
    );
  }
}
