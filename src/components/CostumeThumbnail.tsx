import classNames from "classnames";
import Image from "next/image";
import swordIcon from "../../public/weapons_types/1h-sword.png";
import bigSwordIcon from "../../public/weapons_types/2h-sword.png";
import fistIcon from "../../public/weapons_types/fist.png";
import gunIcon from "../../public/weapons_types/gun.png";
import spearIcon from "../../public/weapons_types/spear.png";
import staffIcon from "../../public/weapons_types/staff.png";

const weaponsIcons = {
  SWORD: swordIcon,
  BIG_SWORD: bigSwordIcon,
  FIST: fistIcon,
  GUN: gunIcon,
  SPEAR: spearIcon,
  STAFF: staffIcon,
};

const RARITY = {
  RARE: 1,
  S_RARE: 3,
  SS_RARE: 4,
};

type WeaponType = "SWORD" | "BIG_SWORD" | "SPEAR" | "FIST" | "STAFF" | "GUN";

interface CostumeThumbnailProps {
  src: string;
  alt: string;
  weaponType?: WeaponType;
  rarity?: number | string;
  imgClasses?: string;
}

export default function CostumeThumbnail({
  src,
  alt,
  weaponType,
  rarity = 1,
  imgClasses = "",
}: CostumeThumbnailProps): JSX.Element {
  const costumeRarity = typeof rarity === "number" ? rarity : RARITY[rarity];

  return (
    <div
      className="h-20 w-20 relative"
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
