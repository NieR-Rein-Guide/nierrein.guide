import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/legacy/image";
import SVG from "react-inlinesvg";
import Link from "next/link";
import WeaponThumbnail from "./WeaponThumbnail";
import getBaseRarity from "@utils/getBaseRarity";
import { weapon } from "@prisma/client";
import Element from "@components/Element";
import { ElementTypes } from "@models/types";

type WeaponType = "SWORD" | "BIG_SWORD" | "SPEAR" | "FIST" | "STAFF" | "GUN";

interface CostumeThumbnailProps {
  src?: string | undefined;
  alt?: string | undefined;
  weaponType?: WeaponType | string;
  rarity?: number | string;
  imgClasses?: string;
  className?: string;
  isLarge?: boolean;
  isDark?: boolean;
  onClick?: () => void | undefined;
  children?: JSX.Element;
  href?: string;
  sizeClasses?: string;
  weapon?: weapon;
  attribute?: ElementTypes | string;
}

export default function CostumeThumbnail({
  src,
  alt = "Empty",
  weaponType,
  rarity = 2,
  imgClasses = "",
  className = "",
  onClick = undefined,
  isLarge,
  isDark,
  children,
  href,
  sizeClasses = "min-h-20 min-w-20 h-20 w-20",
  weapon,
  attribute,
}: CostumeThumbnailProps): JSX.Element {
  const costumeRarity = typeof rarity === "number" ? rarity : RARITY[rarity];
  const emptyBackground = isLarge
    ? "/decorations/costume_empty_large.png"
    : "/decorations/costume_empty_standard.png";

  if (isLarge) {
    return (
      <div
        className={classNames("relative overflow-hidden", className)}
        style={{
          backgroundImage: `url(/decorations/background_rarity_${costumeRarity}_large.png)`,
          width: "156px",
          height: "336px",
        }}
      >
        {children}
        <div className="mt-1 ml-1">
          <Image
            className="z-10 pointer-events-none"
            layout="fixed"
            width={148}
            height={328}
            src={`/decorations/corners_rarity_${costumeRarity}_large.png`}
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
          <div className="flex flex-col w-10">
            <Image src={weaponsIcons[weaponType]} alt={alt} />
            {isDark && (
              <SVG src="/icons/weapons/dark.svg" className="h-10 w-10" />
            )}
            {attribute && <Element size={40} type={attribute} />}
          </div>
        </div>

        {weapon && (
          <div className="absolute bottom-2 right-2 z-20">
            <WeaponThumbnail
              href={`/weapons/${weapon.slug}`}
              rarity={getBaseRarity(weapon)}
              alt={weapon.name}
              image_path={weapon.image_path}
              element={weapon.attribute}
              isDark={weapon.is_ex_weapon}
              type={weapon.weapon_type}
              sizeClasses="h-16 w-16"
            />
          </div>
        )}

        <div
          className={classNames("absolute inset-0 transform")}
          style={{
            width: "156px",
            height: "336px",
          }}
        >
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className={classNames("z-0", imgClasses)}
            src={src}
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
        backgroundImage: `url(/decorations/background_rarity_${costumeRarity}.png)`,
      }}
    >
      {src && (
        <Image
          className="z-10"
          layout="fill"
          src={`/decorations/corners_rarity_${costumeRarity}.png`}
          alt=""
        />
      )}
      {weaponType && (
        <div
          className="z-10 h-6 w-6 absolute"
          style={{
            top: "1px",
            left: "1px",
          }}
        >
          <Image layout="fill" src={weaponsIcons[weaponType]} alt={alt} />
        </div>
      )}
      {attribute && (
        <div
          className="z-10 h-6 w-6 absolute"
          style={{
            top: "26px",
            left: "1px",
          }}
        >
          <Element size={24} type={attribute} />
        </div>
      )}

      <Image
        className={classNames("z-0", imgClasses)}
        layout="fill"
        objectFit="contain"
        src={src ?? emptyBackground}
        alt={alt}
      />

      {href && (
        <Link href={href} passHref className="absolute inset-0 z-10">
          <span className="sr-only">See costume</span>
        </Link>
      )}
    </div>
  );
}
