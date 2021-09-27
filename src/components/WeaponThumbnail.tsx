import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/image";
import Element from "@components/Element";
import { ElementTypes, WeaponType } from "@models/types";
import weaponsIcons from "@utils/weaponsIcons";
import SVG from "react-inlinesvg";

interface WeaponThumbnailProps {
  id: string | number;
  alt?: string;
  rarity: number | string;
  type: WeaponType;
  isDark?: boolean;
  element: ElementTypes;
  imgClasses?: string;
  className?: string;
  isLarge?: boolean;
}

export default function CostumeThumbnail({
  id,
  alt,
  rarity,
  type,
  isDark = false,
  element,
  imgClasses = "",
  className = "",
  isLarge = false,
}: WeaponThumbnailProps): JSX.Element {
  const weaponRarity = typeof rarity === "number" ? rarity : RARITY[rarity];

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
          <div className="flex flex-col w-9">
            <Element type={element} />
            <Image src={weaponsIcons[type]} alt={alt} />
            {isDark && (
              <SVG src="/icons/weapons/dark.svg" className="h-8 w-8" />
            )}
          </div>
        </div>

        <div
          className={classNames(
            "absolute inset-0 transform",
            type === "GUN" || type === "FIST" ? "-rotate-45" : ""
          )}
          style={{
            width: "156px",
            height: "336px",
          }}
        >
          <Image
            layout="fill"
            objectFit="cover"
            className={classNames("z-0", imgClasses)}
            src={`/ui/weapon/wp${id}_full.png`}
            alt={alt}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames("h-20 w-20 relative", className)}
      style={{
        backgroundImage: `url(/decorations/background_rarity_${weaponRarity}.png)`,
      }}
    >
      <Image
        className="z-10"
        layout="fill"
        src={`/decorations/corners_rarity_${weaponRarity}.png`}
        alt={alt}
      />
      <div
        className="z-10 h-6 w-6 absolute"
        style={{
          top: "1px",
          left: "1px",
        }}
      >
        <Element type={element} />
      </div>

      <div
        className="z-10 h-6 w-6 absolute"
        style={{
          top: "26px",
          left: "1px",
        }}
      >
        <Image src={weaponsIcons[type]} alt={alt} />
      </div>
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
        className={classNames("z-0", imgClasses)}
        src={`/weapons_thumbnails/wp${id}_thumbnail.png`}
        alt={alt}
      />
    </div>
  );
}
