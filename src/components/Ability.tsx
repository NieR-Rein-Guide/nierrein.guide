import getAbilityIcon from "@utils/getAbilityIcon";
import classNames from "classnames";
import Image from "next/image";
import SVG from "react-inlinesvg";

interface AbilityProps {
  name: string;
  description: string;
  AssetCategoryId: number;
  AssetVariationId: number;
  level?: number;
  maxLevel?: number;
  className?: string;
}

export default function Ability({
  name,
  description,
  AssetCategoryId,
  AssetVariationId,
  level = 1,
  maxLevel = 4,
  className = "",
}: AbilityProps): JSX.Element {
  return (
    <div
      className={classNames(
        "flex gap-4 bg-grey-dark p-4 relative bordered",
        className
      )}
    >
      <span className="absolute top-2 right-4 text-xs mt-2 bg-brown px-2 py-1">
        Lv. {level}/{maxLevel}
      </span>
      <div className="flex items-center">
        <div className="relative mr-4">
          <SVG src="/decorations/frame-ability.svg" className="h-16 w-16" />
          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              layout="fixed"
              width={64}
              height={64}
              alt=""
              src={getAbilityIcon(AssetCategoryId, AssetVariationId)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <strong className="font-display text-2xl text-beige">{name}</strong>
          <p className="text-beige-text">
            <span>{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
