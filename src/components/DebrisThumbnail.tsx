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
  image_path_base,
  name,
  rarity = 20,
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
        backgroundImage: image_path_base
          ? `url(/decorations/background_rarity_${debrisRarity}.png)`
          : undefined,
      }}
    >
      {image_path_base && (
        <Image
          className="z-10"
          layout="fill"
          src={`/decorations/corners_rarity_${debrisRarity}.png`}
          alt={name}
        />
      )}

      <Image
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
