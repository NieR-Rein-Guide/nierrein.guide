import classNames from "classnames";
import Image from "next/legacy/image";
import CloseBtnIcon from "../../public/icons/close-btn.png";
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight,
} from "react-instantsearch-dom";
import { searchClient } from "@libs/search";
import { ICostume } from "./pages/costumes";
import { usePanelStore } from "@store/panels";
import { AiOutlinePushpin } from "react-icons/ai";
import CostumeThumbnail from "./CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import AbilityThumbnail from "./AbilityThumbnail";
import SkillThumbnail from "./SkillThumbnail";
import { IWeapon } from "./pages/weapons";
import WeaponThumbnail from "./WeaponThumbnail";

export function Search({ isOpen, setIsOpen }) {
  function toggleSearchPanel() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 right-0 w-full z-panels bg-grey-dark transform transition ease-out-cubic",
        isOpen ? "" : "-translate-y-full"
      )}
    >
      <InstantSearch indexName="costumes" searchClient={searchClient}>
        <div className="flex items-center gap-x-4 border-b border-beige border-opacity-50 p-8">
          <SearchBox />
          <button
            className="flex items-center transform transition ease-out-cubic hover:scale-95"
            onClick={toggleSearchPanel}
            title="Close"
          >
            <Image
              height={36}
              width={67}
              objectFit="contain"
              src={CloseBtnIcon}
              alt="Close"
            />
          </button>
        </div>
        <div className="p-8 max-w-7xl mx-auto overflow-y-auto border-b border-beige border-opacity-50 max-h-[1000px]">
          <Stats />
          <InfiniteHits hitComponent={CostumeHit} />
        </div>
      </InstantSearch>

      {/* <InstantSearch indexName="weapons" searchClient={searchClient}>
        <div className="flex items-center gap-x-4 border-b border-beige border-opacity-50 p-8">
          <SearchBox />
          <button
            className="flex items-center transform transition ease-out-cubic hover:scale-95"
            onClick={toggleSearchPanel}
            title="Close"
          >
            <Image
              height={36}
              width={67}
              objectFit="contain"
              src={CloseBtnIcon}
              alt="Close"
            />
          </button>
        </div>
        <div className="p-8 max-w-7xl mx-auto overflow-y-auto border-b border-beige border-opacity-50 max-h-[1000px]">
          <Stats />
          <InfiniteHits hitComponent={WeaponHit} />
        </div>
      </InstantSearch> */}
    </div>
  );
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
