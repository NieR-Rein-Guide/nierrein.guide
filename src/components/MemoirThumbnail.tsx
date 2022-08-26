import RARITY from "@utils/rarity";
import classNames from "classnames";
import Image from "next/image";
import { CDN_URL } from "@config/constants";
import { memoir } from "@prisma/client";

interface MemoirThumbnailProps extends memoir {
  onClick?: () => void | undefined;
  className?: string[] | string;
}

export default function MemoirThumbnail({
  image_path_base,
  rarity = "RARE",
  className,
  onClick = undefined,
}: MemoirThumbnailProps): JSX.Element {
  const memoirRarity = typeof rarity === "number" ? rarity : RARITY[rarity];

  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-20 w-20 relative overflow-hidden",
        onClick ? "cursor-pointer hover:scale-105 transition transform" : "",
        className
      )}
      style={{
        backgroundImage: `url(/decorations/background_rarity_${memoirRarity}.png)`,
      }}
    >
      <Image
        className="z-10"
        layout="fill"
        src={`/decorations/corners_rarity_${memoirRarity}.png`}
        alt=""
      />
      <img
        className="z-0 p-1"
        src={`${CDN_URL}${image_path_base}full.png`}
        alt=""
      />
    </div>
  );
}