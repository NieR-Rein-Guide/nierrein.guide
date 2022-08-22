import Image from "next/image";
import SVG from "react-inlinesvg";
import getModelPath from "@utils/getModelPath";
import dynamic from "next/dynamic";
import { useState } from "react";
import Element from "@components/Element";
import {
  companion,
  companion_ability,
  companion_ability_link,
  companion_skill,
  companion_skill_link,
  companion_stat,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import classNames from "classnames";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

interface CompanionThumbnailProps {
  companion:
    | (companion & {
        companion_ability_link: (companion_ability_link & {
          companion_ability: companion_ability;
        })[];
        companion_skill_link: (companion_skill_link & {
          companion_skill: companion_skill;
        })[];
        companion_stat: companion_stat[];
      })
    | companion;
  small?: boolean;
  onClick?: () => void | undefined;
}

export default function CompanionThumbnail({
  companion,
  small,
  onClick = undefined,
}: CompanionThumbnailProps): JSX.Element {
  const [isShowingModel, setIsShowingModel] = useState(false);

  if (small) {
    return (
      <div
        onClick={onClick}
        className={classNames(
          "h-20 w-20 relative",
          onClick ? "cursor-pointer hover:scale-105 transition transform" : ""
        )}
        style={{
          backgroundImage: `url(/decorations/background_rarity_2.png)`,
        }}
      >
        <Image
          className="z-10"
          layout="fill"
          src={`/decorations/corners_rarity_2.png`}
          alt=""
        />
        <div
          className="z-10 h-6 w-6 absolute"
          style={{
            top: "1px",
            left: "1px",
          }}
        >
          <Element type={companion?.attribute} />
        </div>

        {companion?.name && (
          <img
            className="z-0 h-full w-auto mx-auto p-1"
            src={`${CDN_URL}${companion?.image_path_base}full.png`}
            alt={companion?.name}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full"
      style={{ height: "222px" }}
    >
      <div className="bordered-lg bg-grey-dark h-full w-full">
        <div className="relative z-10 h-full w-full py-4">
          {(isShowingModel && (
            <ModelWithNoSSR
              path={getModelPath("companion", `sk_${companion?.companion_id}`)}
            />
          )) || (
            <img
              className="mx-auto h-full"
              src={`${CDN_URL}${companion?.image_path_base}full.png`}
              alt={companion?.name}
            />
          )}
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute -left-24 top-24 transform -scale-1">
            <SVG
              src="/decorations/square-right.svg"
              className="h-48 filter brightness-30 floating"
            />
          </div>

          <SVG
            src="/decorations/square-right.svg"
            className="h-48 absolute -right-20 -top-16 filter brightness-30 floating"
          />
          <SVG
            src="/decorations/c_rect_inside.svg"
            className="absolute -left-64 floating"
          />
          <SVG
            src="/decorations/c_rect_outside.svg"
            className="absolute -left-64 floating"
          />
        </div>
      </div>

      <div className="absolute top-4 left-4 w-42 h-24 p-1 z-50">
        <button
          className="btn"
          onClick={() => setIsShowingModel(!isShowingModel)}
        >
          {(isShowingModel && "View Artwork") || "View 3D Model"}
        </button>
      </div>

      <div className="absolute top-6 right-8">
        <Element type={companion?.attribute} />
      </div>
    </div>
  );
}
