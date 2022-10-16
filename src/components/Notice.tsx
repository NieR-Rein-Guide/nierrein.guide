import classNames from "classnames";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import { notification } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export const EVENT_TYPES = {
  Event: "Event",
  Issue: "Issue",
  SummonsUpdate: "Summons Update",
  Campaign: "Campaign",
};

export default function Notice({
  title,
  release_time,
  thumbnail_path,
  notification_id,
}: notification): JSX.Element {
  const [dateRelative, setDateRelative] = useState(
    formatDistanceToNow(new Date(release_time), {
      addSuffix: true,
    })
  );

  useEffect(() => {
    setDateRelative(
      formatDistanceToNow(new Date(release_time), {
        addSuffix: true,
      })
    );
  }, [release_time]);

  return (
    <div className="group w-full relative cursor-pointer border border-beige border-opacity-20">
      <div
        className={classNames(
          "flex flex-col md:flex-row md:items-center gap-x-4 bg-beige-darker filter group-hover:bg-grey-dark transition ease-out-cubic",
          !thumbnail_path && "pt-4 md:p-4"
        )}
      >
        {thumbnail_path && (
          <img
            className="h-28 object-contain mt-4 mb-2 md:mt-0 md:mb-0"
            loading="lazy"
            src={`https://web.app.nierreincarnation.com${thumbnail_path}`}
            alt=""
          />
        )}
        <div className="flex flex-col items-center md:items-baseline">
          <h3 className="font-labor font-semibold text-base md:text-xl text-center md:text-left max-w-xs mx-auto md:mx-0 md:max-w-full">
            {title}
          </h3>
          <time className="text-sm text-beige">{dateRelative}</time>
        </div>
        <div className="mt-4 md:hidden">
          <div className="relative bordered bg-grey-dark w-full font-semibold z-10 flex items-center justify-center py-4">
            Read notice
            <SVG
              className={classNames(
                "absolute right-4 transform -scale-x-1 ease-out-cubic h-6 text-beige-accent"
              )}
              src="/decorations/arrow-left.svg"
            />
          </div>
        </div>
        <div className="absolute right-4 hidden md:block">
          <SVG
            className={classNames(
              "transform -scale-x-1 ease-out-cubic h-6 text-beige-accent"
            )}
            src="/decorations/arrow-left.svg"
          />
        </div>
      </div>

      <Link href={`/notice/${notification_id}`} passHref>
        <a className="absolute inset-0 z-10">
          <span className="sr-only">See notice</span>
        </a>
      </Link>
    </div>
  );
}
