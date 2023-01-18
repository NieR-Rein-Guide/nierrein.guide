import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import Star from "./decorations/Star";
import SVG from "react-inlinesvg";
import getBaseRarity from "@utils/getBaseRarity";
import { costume, weapon } from "@prisma/client";
import CostumeThumbnail from "./CostumeThumbnail";

type Weapon = weapon & {
  costume: costume;
};

export default function WeaponArtwork({ weapon }: { weapon: Weapon }) {
  const baseRarity = getBaseRarity(weapon);

  return (
    <div className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 h-[700px] w-full select-none">
      <div className="bordered-lg bg-grey-dark h-full w-full">
        <div className="relative z-10 h-full w-full">
          <img
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            src={`${CDN_URL}${weapon.image_path}full.png`}
            alt={`${weapon.name} thumbnail`}
          />
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

      {weapon.costume && (
        <div className="absolute left-6 bottom-6 z-50">
          <CostumeThumbnail
            href={`/characters/${weapon.costume.character.slug}/${weapon.costume.slug}`}
            src={`${CDN_URL}${weapon.costume.image_path_base}battle.png`}
            alt={`${weapon.costume.title} thumbnail`}
            rarity={RARITY[weapon.costume.rarity]}
            isDark={weapon.costume.is_ex_costume}
            weaponType={weapon.costume.weapon_type}
          />
        </div>
      )}

      <span className="flex absolute bottom-6 right-6">
        {Array.from({
          length: RARITY[baseRarity],
        }).map((_, index) => (
          <div className="w-8 h-8" key={index}>
            <Star rarity={RARITY[baseRarity]} />
          </div>
        ))}
      </span>
    </div>
  );
}
