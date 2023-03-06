import { CDN_URL } from "@config/constants";
import { Tooltip } from "@mui/material";
import getGaugeLevel from "@utils/getGaugeLevel";
import skillGaugeColors, {
  skillGaugeBorderColors,
} from "@utils/skillGaugeColors";
import classNames from "classnames";
import Image from "next/legacy/image";
import SVG from "react-inlinesvg";
import { Gauge } from "./Gauge";

interface SkillProps {
  name: string;
  description: string;
  SkillCooltimeValue?: number;
  isMaxAscended?: boolean;
  AssetCategoryId?: number;
  AssetVariationId?: number;
  level?: number;
  maxLevel?: number;
  isWeapon?: boolean;
  className?: string;
  imagePathBase?: string;
  gaugeRiseSpeed?: string;
}

export default function Skill({
  name,
  description,
  SkillCooltimeValue,
  gaugeRiseSpeed,
  isMaxAscended,
  level = 1,
  maxLevel = 15,
  isWeapon = false,
  className,
  imagePathBase = "",
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
          <div className="relative h-24 w-24">
            <SVG
              height="96"
              width="96"
              src="/decorations/frame.svg"
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              layout="fixed"
              width={64}
              height={64}
              alt=""
              objectFit="contain"
              src={`${CDN_URL}${imagePathBase}`}
            />
            <div className="absolute -top-1 right-1">
              <Image
                className={classNames(
                  "transform transition-transform ease-out-cubic",
                  isMaxAscended ? "scale-100" : "scale-0"
                )}
                layout="fixed"
                width={24}
                height={24}
                alt=""
                src="/decorations/costume_full_asc.png"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <strong className="font-display text-2xl text-beige">{name}</strong>
          <p className="text-beige-text text-left mb-1 md:pr-16">
            <span>{description}</span>
          </p>
          <Gauge
            isWeapon={isWeapon}
            cooldown_time={SkillCooltimeValue}
            gauge_rise_speed={gaugeRiseSpeed}
          />
        </div>
      </div>
    </div>
  );
}
