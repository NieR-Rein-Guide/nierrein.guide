import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/image";

type WeaponType = "SWORD" | "BIG_SWORD" | "SPEAR" | "FIST" | "STAFF" | "GUN";

interface CostumeThumbnailProps {
  src: string;
  alt: string;
  weaponType?: WeaponType | string;
  rarity?: number | string;
  imgClasses?: string;
  className?: string;
}

export default function CostumeThumbnail({
  src,
  alt,
  weaponType,
  rarity = 1,
  imgClasses = "",
  className = "",
}: CostumeThumbnailProps): JSX.Element {
  const costumeRarity = typeof rarity === "number" ? rarity : RARITY[rarity];

  return (
    <div
      className={classNames("min-h-20 min-w-20 h-20 w-20 relative", className)}
      style={{
        backgroundImage: `url(/decorations/background_rarity_${costumeRarity}.png)`,
      }}
    >
      <Image
        className="z-10"
        layout="fill"
        src={`/decorations/corners_rarity_${costumeRarity}.png`}
        alt={alt}
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
      <Image
        className={classNames("z-0", imgClasses)}
        layout="fill"
        src={src}
        alt={alt}
      />
    </div>
  );
}
