import { CDN_URL } from "@config/constants";
import classNames from "classnames";
import Image from "next/image";
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
}

export default function Ability({
  name,
  description,
  imagePathBase = "",
  level = 1,
  maxLevel = 4,
  className = "",
  href,
}: AbilityProps): JSX.Element {
  return (
    <div
      className={classNames(
        "flex gap-4 bg-grey-dark p-4 relative bordered",
        className
      )}
    >
      <span className="absolute top-2 right-4 text-xs mt-2 bg-brown px-2 py-1">
        Lv. {level}/{maxLevel}
      </span>
      <div className="flex items-center">
        <div
          className={classNames(
            "relative mr-4",
            href ? "cursor-pointer hover:scale-105 transition transform" : ""
          )}
        >
          <SVG src="/decorations/frame-ability.svg" className="h-16 w-16" />
          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <img alt="" src={`${CDN_URL}${imagePathBase}standard.png`} />
          </div>

          {href && (
            <Link href={href} passHref>
              <a className="absolute inset-0 z-10">
                <span className="sr-only">See ability {name}</span>
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-col items-start">
          <strong className="font-display text-2xl text-beige">{name}</strong>
          <p className="text-beige-text">
            <span>{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
