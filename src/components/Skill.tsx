import getGaugeLevel from "@utils/getGaugeLevel";
import getSkillIcon from "@utils/getSkillIcon";
import classNames from "classnames";
import Image from "next/image";
import SVG from "react-inlinesvg";

interface SkillProps {
  name: string;
  description: string;
  SkillCooltimeValue?: number;
  AssetCategoryId: number;
  AssetVariationId: number;
  level?: number;
  maxLevel?: number;
  isWeapon?: boolean;
  className?: string;
}

export default function Skill({
  name,
  description,
  SkillCooltimeValue,
  AssetCategoryId,
  AssetVariationId,
  level = 1,
  maxLevel = 15,
  isWeapon = false,
  className,
}: SkillProps): JSX.Element {
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
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative mr-4">
          <SVG src="/decorations/frame.svg" className="h-24 w-24" />
          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              layout="fixed"
              width={64}
              height={64}
              alt=""
              src={getSkillIcon(AssetCategoryId, AssetVariationId)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <strong className="font-display text-2xl text-beige">{name}</strong>
          <p className="text-beige-text">
            <span>{description}</span>
          </p>
          {SkillCooltimeValue && (
            <p className="text-xs mt-2">
              <span className="bg-brown px-2 py-1 mr-2">
                {!isWeapon &&
                  `Gauge Level: ${getGaugeLevel(SkillCooltimeValue)}`}
                {isWeapon && `Cooldown: ${SkillCooltimeValue / 30}s`}
              </span>
              {!isWeapon && (
                <span className="text-xs">{SkillCooltimeValue}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
