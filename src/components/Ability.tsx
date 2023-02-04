import { CDN_URL } from "@config/constants";
import classNames from "classnames";
import Link from "next/link";
import SVG from "react-inlinesvg";

interface AbilityProps {
  name: string;
  description: string;
  AssetCategoryId?: number;
  AssetVariationId?: number;
  level?: number;
  maxLevel?: number;
  className?: string;
  imagePathBase?: string;
  href?: string;
  fullLink?: boolean;
  awakeningLevel?: number;
  isSmall?: boolean;
}

export default function Ability({
  name,
  description,
  imagePathBase = "",
  level = 1,
  maxLevel = 4,
  className = "",
  href,
  fullLink,
  awakeningLevel,
  isSmall,
}: AbilityProps): JSX.Element {
  return (
    <div
      className={classNames(
        "flex gap-4 bg-grey-dark relative",
        className,
        fullLink ? "transform ease-out-cubic transition hover:scale-105" : "",
        isSmall ? "" : "p-4 bordered"
      )}
    >
      {awakeningLevel && (
        <span className="absolute top-2 right-4 text-xs mt-2">
          <img
            src={
              awakeningLevel === 5
                ? "/icons/costumes/awaken_rank_icon_rainbow.png"
                : "/icons/costumes/awaken_rank_icon_default.png"
            }
          />
          <span className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 font-semibold">
            {awakeningLevel}
          </span>
        </span>
      )}
      {level && (
        <span
          className={classNames(
            "absolute top-2 right-4 text-xs mt-2 bg-brown px-2 py-1",
            isSmall ? "hidden" : ""
          )}
        >
          Lv. {level}/{maxLevel}
        </span>
      )}
      <div className="flex items-center">
        <div
          className={classNames(
            "relative mr-4",
            href ? "cursor-pointer hover:scale-105 transition transform" : ""
          )}
        >
          <SVG
            src="/decorations/frame-ability.svg"
            className={classNames(isSmall ? "h-12 w-12" : "h-16 w-16")}
          />
          <div
            className={classNames(
              "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
              isSmall ? "h-12 w-12 p-2" : "h-16 w-16"
            )}
          >
            <img alt="" src={`${CDN_URL}${imagePathBase}standard.png`} />
          </div>

          {href && !fullLink && (
            (<Link href={href} passHref className="absolute inset-0 z-10">

              <span className="sr-only">See ability {name}</span>

            </Link>)
          )}
        </div>
        <div className="flex flex-col items-start">
          <strong
            className={classNames(
              "font-display text-beige",
              isSmall ? "text-xl leading-none" : "text-2xl"
            )}
          >
            {name}
          </strong>
          <p
            className={classNames(
              "text-beige-text text-left md:pr-16",
              isSmall ? "text-xs" : ""
            )}
          >
            <span>{description}</span>
          </p>
        </div>
      </div>

      {href && fullLink && (
        <a href={href} className="absolute inset-0 z-10">
          <span className="sr-only">See ability {name}</span>
        </a>
      )}
    </div>
  );
}
