import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/legacy/image";
import Element from "@components/Element";
import { ElementTypes, WeaponType } from "@models/types";
import weaponsIcons from "@utils/weaponsIcons";
import SVG from "react-inlinesvg";
import { CDN_URL } from "@config/constants";
import Link from "next/link";
import { costume } from "@prisma/client";
import CostumeThumbnail from "./CostumeThumbnail";

interface WeaponThumbnailProps {
  alt?: string;
  rarity: number | string;
  type: WeaponType | string;
  isDark?: boolean;
  element: ElementTypes | string;
  imgClasses?: string;
  className?: string;
  isLarge?: boolean;
  image_path: string;
  onClick?: () => void | undefined;
  children?: JSX.Element;
  href?: string;
  sizeClasses?: string;
  costume?: costume;
}

export default function WeaponThumbnail({
  alt,
  rarity = 2,
  type,
  isDark = false,
  element,
  imgClasses = "",
  className = "",
  isLarge = false,
  image_path,
  onClick = undefined,
  children,
  href,
  sizeClasses = "h-20 w-20",
  costume,
}: WeaponThumbnailProps): JSX.Element {
  let weaponRarity = typeof rarity === "number" ? rarity : RARITY[rarity];
  if (rarity === "LEGEND") {
    weaponRarity = 4;
  }

  if (isLarge) {
    return (
      <div
        className={classNames("relative overflow-hidden", className)}
        style={{
          backgroundImage: `url(/decorations/background_rarity_${weaponRarity}_large.png)`,
          width: "156px",
          height: "336px",
        }}
      >
        {children}
        <div className="mt-1 ml-1">
          <Image
            className="z-10"
            layout="fixed"
            width={148}
            height={328}
            src={`/decorations/corners_rarity_${weaponRarity}_large.png`}
            alt={alt}
          />
        </div>
        <div
          className="z-10 absolute"
          style={{
            top: "4px",
            left: "2px",
          }}
        >
          <div className="flex flex-col w-8">
            <Element type={element} />
            <Image src={weaponsIcons[type]} alt={alt} />
            {isDark && (
              <SVG src="/icons/weapons/dark.svg" className="h-8 w-8" />
            )}
          </div>
        </div>

        {costume && (
          <div className="absolute bottom-2 right-2 z-50">
            <CostumeThumbnail
              href={`/characters/${costume.character.slug}/${costume.slug}`}
              src={`${CDN_URL}${costume.image_path_base}battle.png`}
              alt={`${costume.title} thumbnail`}
              rarity={RARITY[costume.rarity]}
              weaponType={costume.weapon_type}
              isDark={costume.is_ex_costume}
              sizeClasses="h-16 w-16"
            />
          </div>
        )}

        <div
          className="absolute inset-0 transform"
          style={{
            width: "156px",
            height: "336px",
          }}
        >
          <Image
            layout="fill"
            objectFit="contain"
            className={classNames("z-0", imgClasses)}
            src={
              image_path
                ? `${CDN_URL}${image_path}full.png`
                : "/decorations/weapon_empty_standard.png"
            }
            alt={alt}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={classNames(
        "relative",
        sizeClasses,
        onClick || href
          ? "cursor-pointer hover:scale-105 transition transform"
          : "",
        className
      )}
      style={{
        backgroundImage: image_path
          ? `url(/decorations/background_rarity_${weaponRarity}.png)`
          : undefined,
      }}
    >
      {image_path && (
        <Image
          className="z-10"
          layout="fill"
          src={`/decorations/corners_rarity_${weaponRarity}.png`}
          alt={alt}
        />
      )}

      {element && (
        <div
          className="z-10 h-6 w-6 absolute"
          style={{
            top: "1px",
            left: "1px",
          }}
        >
          <Element type={element} />
        </div>
      )}

      {type && (
        <div
          className="z-10 h-6 w-6 absolute"
          style={{
            top: "26px",
            left: "1px",
          }}
        >
          <Image src={weaponsIcons[type]} alt={alt} />
        </div>
      )}

      {isDark && (
        <div
          className="z-10 h-6 w-6 absolute"
          style={{
            top: "50px",
            left: "1px",
          }}
        >
          <SVG src="/icons/weapons/dark.svg" className="h-6 w-6" />
        </div>
      )}

      <Image
        layout="fill"
        objectFit="contain"
        className={classNames("z-0 absolute top-0", imgClasses)}
        src={
          image_path
            ? `${CDN_URL}${image_path}standard.png`
            : "/decorations/weapon_empty_standard.png"
        }
        alt={alt}
      />

      {href && (
        (<Link href={href} passHref className="absolute inset-0 z-10">

          <span className="sr-only">See weapon</span>

        </Link>)
      )}
    </div>
  );
}
