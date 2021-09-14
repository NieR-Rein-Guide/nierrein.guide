import getAbilityIcon from "@utils/getAbilityIcon";
import Image from "next/image";

interface AbilityProps {
  name: string;
  description: string;
  AssetCategoryId: number;
  AssetVariationId: number;
  level?: number;
  maxLevel?: number;
}

export default function Ability({
  name,
  description,
  AssetCategoryId,
  AssetVariationId,
  level = 1,
  maxLevel = 4,
}: AbilityProps): JSX.Element {
  return (
    <div className="flex gap-4 bg-grey-dark p-4 relative bordered">
      <span className="absolute top-2 right-4 text-xs mt-2 bg-brown px-2 py-1">
        {level}/{maxLevel}
      </span>
      <div className="flex items-center">
        <div className="h-16 w-16 relative">
          <Image
            layout="fixed"
            width={64}
            height={64}
            alt=""
            src={getAbilityIcon(AssetCategoryId, AssetVariationId)}
          />
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
