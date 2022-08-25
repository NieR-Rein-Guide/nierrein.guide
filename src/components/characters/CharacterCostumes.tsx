import React, { Dispatch, SetStateAction } from "react";
import Star from "@components/decorations/Star";
import CostumeThumbnail from "@components/CostumeThumbnail";
import classNames from "classnames";
import RARITY from "@utils/rarity";
import { CDN_URL } from "@config/constants";
import { character, costume } from "@prisma/client";

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
  const selectedCharacterCostumes = costumes.sort(
    (a, b) => RARITY[a.rarity] - RARITY[b.rarity]
  );

  return (
    <div className="my-2 p-2 overflow-auto">
      <p className="text-beige">
        {selectedCharacterCostumes.length} costumes found for{" "}
        {currentCharacter.name}
      </p>

      <div className="grid md:grid-cols-6 lg:grid-cols-8 gap-2">
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
            <span className="text-xs truncate mt-1">
              {costume.title ? costume.title : "No translation"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
