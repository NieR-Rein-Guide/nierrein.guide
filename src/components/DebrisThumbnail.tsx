import classNames from "classnames";

import { CDN_URL } from "@config/constants";
import { debris } from "@prisma/client";

interface DebrisThumbnailProps extends debris {
  className?: string | string[];
  imgClasses?: string | string[];
  sizeClasses?: string;
  onClick?: () => void | undefined;
}

const DEBRIS_RARITY = {
  RARE: 2,
  S_RARE: 3,
  SS_RARE: 4,
};

export default function DebrisThumbnail({
  image_path_base,
  name,
  rarity,
  className,
  imgClasses,
  sizeClasses = "h-20 w-20",
  onClick = undefined,
}: DebrisThumbnailProps): JSX.Element {
  const debrisRarity = DEBRIS_RARITY[rarity];

  return (
    <div
      onClick={onClick}
      className={classNames(
        "relative",
        sizeClasses,
        onClick ? "cursor-pointer hover:scale-105 transition transform" : "",
        className
      )}
      style={{
        backgroundImage: image_path_base
          ? `url(/decorations/background_rarity_${debrisRarity}.png)`
          : undefined,
      }}
    >
      {image_path_base && (
        <img
          className="z-10"
          layout="fill"
          src={`/decorations/corners_rarity_${debrisRarity}.png`}
          alt={name}
        />
      )}

      <img
        layout="fill"
        className={classNames("z-0", imgClasses)}
        src={
          image_path_base
            ? `${CDN_URL}${image_path_base}`
            : "/decorations/thought_empty_standard.png"
        }
        alt={name}
      />
    </div>
  );
}
