import classNames from "classnames";
import Image from "next/image";
import { CDN_URL } from "@config/constants";
import { debris } from "@prisma/client";

interface DebrisThumbnailProps extends debris {
  className?: string | string[];
  imgClasses?: string | string[];
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
  rarity,
  release_time,
  className,
  imgClasses,
}: DebrisThumbnailProps): JSX.Element {
  const debrisRarity = DEBRIS_RARITY[rarity];

  return (
    <div
      className={classNames("h-20 w-20 relative", className)}
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
