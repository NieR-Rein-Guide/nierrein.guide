import Image from "next/image";
import Link from "next/link";
import SVG from "react-inlinesvg";
import { Costume } from "@models/types";
import getModelPath from "@utils/getModelPath";
import WeaponThumbnail from "@components/WeaponThumbnail";
import Star from "@components/decorations/Star";
import Ascend from "@components/decorations/Ascend";
import RARITY from "@utils/rarity";
import dynamic from "next/dynamic";
import { useState } from "react";
import urlSlug from "url-slug";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

const dcTypeCostumes = [
  "ch006006",
  "ch006009",
  "ch009009",
  "ch010003",
  "ch010007",
  "ch012005",
  "ch014007",
  "ch019001",
  "ch019010",
  "ch019012",
];

interface CostumeArtworkProps {
  costume: Costume;
  ascendLevel?: number;
}

export default function CostumeArtwork({
  costume,
  ascendLevel = 4,
}: CostumeArtworkProps): JSX.Element {
  const [isShowingModel, setIsShowingModel] = useState(false);

  return (
    <div
      className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full"
      style={{ height: "700px" }}
    >
      <div className="bordered-lg bg-grey-dark h-full w-full">
        <div className="relative z-10 h-full w-full">
          {(isShowingModel && (
            <ModelWithNoSSR
              path={getModelPath(
                "character",
                `${dcTypeCostumes.includes(costume.ids.actor) ? "dc" : "sk"}_${
                  costume.ids.actor
                }`
              )}
            />
          )) || (
            <Image
              layout="fill"
              objectFit="cover"
              src={`/character_medium/${costume.ids.actor}_full-1920-1080.png`}
              alt={`${costume.character.en} (${costume.costume.name.en}) illustration`}
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
        {Array.from({ length: RARITY[costume.costume.rarity] }).map(
          (_, index) => (
            <div className="w-8 h-8" key={index}>
              <Star rarity={RARITY[costume.costume.rarity]} />
            </div>
          )
        )}
      </span>

      {costume.costume.weapon && (
        <Link
          href={`/database/weapons/${urlSlug(
            costume.costume?.weapon?.name?.en ?? "unnamed"
          )}/${costume.costume.weapon.ids.base}`}
          passHref
        >
          <a className="absolute left-6 bottom-6 transform transition-transform ease-out-cubic hover:scale-105 z-50">
            <WeaponThumbnail
              type={costume.costume.weapon.type}
              element={costume.costume.weapon.attribute}
              id={costume.costume.weapon.ids.asset}
              rarity={costume.costume.weapon.rarity}
              isDark={costume.costume.weapon.isDark}
            />
          </a>
        </Link>
      )}

      <div className="absolute top-4 left-4 w-42 h-24 p-1 z-50">
        <button
          className="btn"
          onClick={() => setIsShowingModel(!isShowingModel)}
        >
          {(isShowingModel && "View Artwork") || "View 3D Model"}
        </button>
      </div>

      <div className="absolute top-6 right-8">
        <Ascend level={ascendLevel} />
      </div>
    </div>
  );
}
