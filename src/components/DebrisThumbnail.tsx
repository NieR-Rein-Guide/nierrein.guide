import classNames from "classnames";
import Image from "next/image";
import { CDN_URL } from "@config/constants";
import { debris } from "@prisma/client";

interface DebrisThumbnailProps extends debris {
  className?: string | string[];
  imgClasses?: string | string[];
  onClick?: () => void | undefined;
}

const DEBRIS_RARITY = {
  20: 2,
  30: 3,
  40: 4,
};

export default function DebrisThumbnail({
  debris_id,
  image_path_base,
  name,
  rarity = 20,
  release_time,
  className,
  imgClasses,
  onClick = undefined,
}: DebrisThumbnailProps): JSX.Element {
  const debrisRarity = DEBRIS_RARITY[rarity];

  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-20 w-20 relative",
        onClick ? "cursor-pointer hover:scale-105 transition transform" : "",
        className
      )}
      style={{
        backgroundImage: `url(/decorations/background_rarity_${debrisRarity}.png)`,
      }}
    >
      <Image
        className="z-10"
        layout="fill"
        src={`/decorations/corners_rarity_${debrisRarity}.png`}
        alt={name}
      />

      <Image
        layout="fill"
        className={classNames("z-0", imgClasses)}
        src={`${CDN_URL}${image_path_base}standard.png`}
        alt={name}
      />
    </div>
  );
}
