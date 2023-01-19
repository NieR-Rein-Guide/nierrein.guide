import React, { Dispatch, SetStateAction } from "react";
import CostumeThumbnail from "@components/CostumeThumbnail";
import classNames from "classnames";
import RARITY from "@utils/rarity";
import { CDN_URL } from "@config/constants";
import { character, costume } from "@prisma/client";
import { AiOutlinePushpin } from "react-icons/ai";
import { usePanelStore } from "@store/panels";

export default function CharacterCostumes({
  currentCharacter,
  currentCostume,
  setCostume,
  costumes,
}: {
  currentCharacter: character;
  currentCostume: costume;
  setCostume: Dispatch<SetStateAction<costume>>;
  costumes: costume[];
}): JSX.Element {
  const addCostumePanel = usePanelStore((state) => state.addCostume);
  const selectedCharacterCostumes = costumes.sort(
    (a, b) => RARITY[a.rarity] - RARITY[b.rarity]
  );

  return (
    <div className="my-2 p-2 overflow-auto">
      <p className="text-beige">
        {selectedCharacterCostumes.length} costume
        {selectedCharacterCostumes.length > 1 ? "s" : ""} found for{" "}
        {currentCharacter.name}
      </p>

      <div className="grid md:grid-cols-6 lg:grid-cols-8">
        {selectedCharacterCostumes.map((costume) => (
          <div
            key={costume.costume_id}
            className="inline-flex flex-col justify-center items-center p-2 cursor-pointer relative group"
            onClick={() => setCostume(costume)}
          >
            <CostumeThumbnail
              src={`${CDN_URL}${costume.image_path_base}battle.png`}
              alt={`${costume.title} thumbnail`}
              rarity={RARITY[costume.rarity]}
              imgClasses={classNames(
                "transition-all filter group-hover:brightness-100",
                currentCostume.costume_id === costume.costume_id
                  ? ""
                  : "brightness-50"
              )}
            />
            <span className="text-xs text-center text-beige leading-none mt-2 font-mono">
              {costume.title ? costume.title : "No translation yet."}
            </span>
            <button
              onClick={() => addCostumePanel(costume.costume_id)}
              className="absolute bottom-4 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
            >
              <AiOutlinePushpin />
              <span className="text-xs">PIN</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
