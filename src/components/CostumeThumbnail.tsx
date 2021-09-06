import Image from "next/image";
import swordIcon from "../../public/weapons_types/1h-sword.png";
import bigSwordIcon from "../../public/weapons_types/2h-sword.png";
import fistIcon from "../../public/weapons_types/fist.png";
import gunIcon from "../../public/weapons_types/gun.png";
import spearIcon from "../../public/weapons_types/spear.png";
import staffIcon from "../../public/weapons_types/staff.png";

const weaponsIcons = {
  sword: swordIcon,
  greatsword: bigSwordIcon,
  fist: fistIcon,
  gun: gunIcon,
  spear: spearIcon,
  staff: staffIcon,
};

type WeaponType = "sword" | "greatsword" | "spear" | "fist" | "staff" | "gun";

interface CostumeThumbnailProps {
  src: string;
  alt: string;
  weaponType?: WeaponType;
}

export default function CostumeThumbnail({
  src,
  alt,
  weaponType,
}: CostumeThumbnailProps): JSX.Element {
  return (
    <div
      className="h-20 w-20 relative"
      style={{
        backgroundImage: `url(/decorations/background_rarity_4.png)`,
      }}
    >
      <Image
        className="z-10"
        layout="fill"
        src="/decorations/corners_rarity_4.png"
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
      <Image className="z-0" layout="fill" src={src} alt={alt} />
    </div>
  );
}
