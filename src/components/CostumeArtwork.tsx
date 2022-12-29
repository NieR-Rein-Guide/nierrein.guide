import Image from "next/image";
import SVG from "react-inlinesvg";
import getModelPath from "@utils/getModelPath";
import Star from "@components/decorations/Star";
import Ascend from "@components/decorations/Ascend";
import RARITY from "@utils/rarity";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CDN_URL } from "@config/constants";
import { character, costume, weapon } from "@prisma/client";
import WeaponThumbnail from "./WeaponThumbnail";
import getBaseRarity from "@utils/getBaseRarity";
import getEmblemPath from "@utils/getEmblemPath";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

type Costume = costume & {
  character: character;
  weapon: weapon;
};

interface CostumeArtworkProps {
  costume: Costume;
  ascendLevel?: number;
}

export default function CostumeArtwork({
  costume,
  ascendLevel = 4,
}: CostumeArtworkProps): JSX.Element {
  const [isShowingModel] = useState(false);

  return (
    <div className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full h-[700px] select-none">
      <div className="bordered-lg bg-grey-dark h-full w-full">
        <div className="relative z-10 h-full w-full">
          {(isShowingModel && (
            <ModelWithNoSSR
              path={getModelPath("character", "costume.costume_id")}
            />
          )) || (
            <Image
              layout="fill"
              objectFit="cover"
              src={`${CDN_URL}${costume.image_path_base}full.png`}
              alt={`${costume.title} (${costume.title}) illustration`}
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
      <span className="flex absolute bottom-6 right-6">
        {Array.from({ length: RARITY[costume.rarity] }).map((_, index) => (
          <div className="w-8 h-8" key={index}>
            <Star rarity={RARITY[costume.rarity]} />
          </div>
        ))}
      </span>

      {costume.weapon && (
        <div className="absolute left-6 bottom-6 z-50">
          <WeaponThumbnail
            href={`/weapons/${costume?.weapon.slug}`}
            rarity={getBaseRarity(costume?.weapon)}
            alt={costume?.weapon.name}
            image_path={costume?.weapon.image_path}
          />
        </div>
      )}

      {costume.emblem && (
        <img
          loading="lazy"
          className="opacity-30 absolute inset-0 h-full object-cover"
          src={`${getEmblemPath(
            costume.emblem.emblem_id.toString(),
            "background"
          )}`}
          alt=""
        />
      )}

      {/* <div className="absolute top-4 left-4 w-42 h-24 p-1 z-50">
        <button
          className="btn"
          onClick={() => setIsShowingModel(!isShowingModel)}
        >
          {(isShowingModel && "View Artwork") || "View 3D Model"}
        </button>
      </div> */}

      <div className="absolute top-6 right-8">
        <Ascend level={ascendLevel} />
      </div>
    </div>
  );
}
