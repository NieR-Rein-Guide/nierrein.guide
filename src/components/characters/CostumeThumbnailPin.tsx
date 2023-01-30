import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import { usePanelStore } from "@store/panels";
import classNames from "classnames";
import { AiOutlinePushpin } from "react-icons/ai";

export function CostumeThumbnailPin({ costume }) {
  const addCostumePanel = usePanelStore((state) => state.addCostume);

  return (
    <div
      className={classNames(
        "group flex flex-col items-center gap-y-2 relative font-mono"
      )}
      key={costume.costume_id}
    >
      <CostumeThumbnail
        href={`/characters/${costume.character.slug}/${costume.slug}`}
        src={`${CDN_URL}${costume.image_path_base}battle.png`}
        alt={`${costume.title} thumbnail`}
        rarity={costume.rarity}
        weaponType={costume.weapon_type}
        isDark={costume.is_ex_costume}
      />
      <p className="text-center text-sm mb-0 leading-none">
        {costume.is_ex_costume && <span className="text-rarity-4">EX </span>}
        {costume.character.name}
      </p>
      <span className="text-xs text-center text-beige line-clamp-1 leading-none transition-opacity ease-out-cubic group-hover:opacity-0 -mt-1">
        {costume.title}
      </span>
      <button
        onClick={() => addCostumePanel(costume.costume_id)}
        className="absolute bottom-0 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
      >
        <AiOutlinePushpin />
        <span className="text-xs">PIN</span>
      </button>
    </div>
  );
}
