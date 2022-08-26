import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/image";
import SVG from "react-inlinesvg";
import { CDN_URL } from "@config/constants";

type WeaponType = "SWORD" | "BIG_SWORD" | "SPEAR" | "FIST" | "STAFF" | "GUN";

interface CostumeThumbnailProps {
  src: string;
  alt: string;
  weaponType?: WeaponType | string;
  rarity?: number | string;
  imgClasses?: string;
  className?: string;
  isLarge?: boolean;
  isDark?: boolean;
  onClick?: () => void | undefined;
}

export default function CostumeThumbnail({
  src,
  alt,
  weaponType,
  rarity = 2,
  imgClasses = "",
  className = "",
  onClick = undefined,
  isLarge,
  isDark,
}: CostumeThumbnailProps): JSX.Element {
  const costumeRarity = typeof rarity === "number" ? rarity : RARITY[rarity];

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
          </div>
        </div>

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
        "min-h-20 min-w-20 h-20 w-20 relative",
        onClick ? "cursor-pointer hover:scale-105 transition transform" : "",
        className
      )}
      style={{
        backgroundImage: `url(/decorations/background_rarity_${costumeRarity}.png)`,
      }}
    >
      <Image
        className="z-10"
        layout="fill"
        src={`/decorations/corners_rarity_${costumeRarity}.png`}
        alt=""
      />
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
      {!alt.includes("undefined") && (
        <Image
          className={classNames("z-0", imgClasses)}
          layout="fill"
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
}
