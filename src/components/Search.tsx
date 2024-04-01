import classNames from "classnames";

import {
  Highlight,
} from "react-instantsearch-dom";
import { ICostume } from "./pages/costumes";
import { usePanelStore } from "@store/panels";
import { AiOutlinePushpin } from "react-icons/ai";
import CostumeThumbnail from "./CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import AbilityThumbnail from "./AbilityThumbnail";
import SkillThumbnail from "./SkillThumbnail";

export function Search({ isOpen, setIsOpen }) {
  return null;
}

function CostumeHit({ hit }: { hit: ICostume }) {
  const addCostumePanel = usePanelStore((state) => state.addCostume);

  return (
    <div
      key={hit.costume_id}
      className="bg-grey-dark bg-opacity-90 border border-beige border-opacity-20"
    >
      <div
        className={classNames(
          "group flex flex-col items-center gap-y-2 relative font-mono"
        )}
      >
        <div className="flex justify-between bg-grey-foreground text-lg px-2 py-1 w-full">
          <p className="flex items-center gap-x-1 text-center text-sm mb-0 leading-none">
            {hit.is_ex_costume && <span className="text-rarity-4">EX </span>}
            <Highlight attribute="character.name" hit={hit} />
            -
            <Highlight attribute="title" hit={hit} />
          </p>
          <button
            onClick={() => addCostumePanel(hit.costume_id)}
            className="flex gap-x-1 rounded-full bg-brown px-2 py-1 umami--click--pin-costume-button transition hover:bg-opacity-80"
          >
            <AiOutlinePushpin />
            <span className="text-xs">PIN</span>
          </button>
        </div>
        <CostumeThumbnail
          href={`/characters/${hit.character.slug}/${hit.slug}`}
          src={`${CDN_URL}${hit.image_path_base}battle.png`}
          alt={`${hit.title} thumbnail`}
          rarity={hit.rarity}
          weaponType={hit.weapon_type}
          isDark={hit.is_ex_costume}
        />
      </div>
      <div className="mb-4 mt-4">
        <SkillThumbnail skill={hit.costume_skill_link[0].costume_skill}>
          <Highlight
            className="-mt-1 text-shadow z-10 text-sm text-center leading-none"
            attribute="costume_skill_link[0].costume_skill.name"
            hit={hit}
          />
        </SkillThumbnail>
      </div>
      <div className="grid grid-cols-3 gap-y-4 text-sm px-4 pb-4">
        <AbilityThumbnail ability={hit.costume_ability_link[0].costume_ability}>
          <Highlight
            className="text-xs text-center"
            attribute="costume_ability_link[0].costume_ability.name"
            hit={hit}
          />
        </AbilityThumbnail>
        <AbilityThumbnail ability={hit.costume_ability_link[1].costume_ability}>
          <Highlight
            className="text-xs text-center"
            attribute="costume_ability_link[1].costume_ability.name"
            hit={hit}
          />
        </AbilityThumbnail>
        <AbilityThumbnail ability={hit.costume_ability_link[2].costume_ability}>
          <Highlight
            className="text-xs text-center"
            attribute="costume_ability_link[2].costume_ability.name"
            hit={hit}
          />
        </AbilityThumbnail>
      </div>
    </div>
  );
}

/* function WeaponHit({ hit }: { hit: IWeapon }) {
  return (
    <div
      key={hit.weapon_id}
      className="bg-grey-dark bg-opacity-90 border border-beige border-opacity-20"
    >
      <div
        className={classNames(
          "group flex flex-col items-center gap-y-2 relative font-mono"
        )}
      >
        <div className="flex justify-between bg-grey-foreground text-lg px-2 py-1 w-full">
          <p className="flex items-center gap-x-1 text-center text-sm mb-0 leading-none">
            {hit.is_ex_weapon && <span className="text-rarity-4">EX </span>}
            <Highlight attribute="name" hit={hit} />
          </p>
        </div>
        <WeaponThumbnail
          element={hit.attribute}
          rarity={hit.rarity}
          type={hit.weapon_type}
          isDark={hit.is_ex_weapon}
          alt={hit.name}
          image_path={hit.image_path}
        />
      </div>
      <div className="mb-4 mt-4">
        <SkillThumbnail skill={hit.weapon_skill_link[0].weapon_skill}>
          <Highlight
            className="-mt-1 text-shadow z-10 text-sm text-center leading-none"
            attribute="weapon_skill_link[0].costume_skill.name"
            hit={hit}
          />
        </SkillThumbnail>
      </div>
      <div className="grid grid-cols-3 gap-y-4 text-sm px-4 pb-4">
        <AbilityThumbnail ability={hit.weapon_ability_link[0].weapon_ability}>
          <Highlight
            className="text-xs text-center"
            attribute="weapon_ability_link[0].weapon_ability.name"
            hit={hit}
          />
        </AbilityThumbnail>
        <AbilityThumbnail ability={hit.weapon_ability_link[1].weapon_ability}>
          <Highlight
            className="text-xs text-center"
            attribute="weapon_ability_link[1].weapon_ability.name"
            hit={hit}
          />
        </AbilityThumbnail>
        {hit.weapon_skill_link[2] && (
          <AbilityThumbnail ability={hit.weapon_ability_link[2].weapon_ability}>
            <Highlight
              className="text-xs text-center"
              attribute="weapon_ability_link[2].weapon_ability.name"
              hit={hit}
            />
          </AbilityThumbnail>
        )}
      </div>
    </div>
  );
} */
