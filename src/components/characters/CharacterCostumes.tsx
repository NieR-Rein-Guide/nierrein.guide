import { Costume } from "@models/types";
import React, { Dispatch, SetStateAction } from "react";
import Star from "@components/decorations/Star";
import CostumeThumbnail from "@components/CostumeThumbnail";
import classNames from "classnames";
import RARITY from "@utils/rarity";

export default function CharacterCostumes({
  currentCostume,
  setCostume,
  costumes,
}: {
  currentCostume: Costume;
  setCostume: Dispatch<SetStateAction<Costume>>;
  costumes: Costume[];
}): JSX.Element {
  const selectedCharacterCostumes = costumes
    .filter((costume) => costume.character.en === currentCostume.character.en)
    .sort((a, b) => RARITY[a.costume.rarity] - RARITY[b.costume.rarity]);

  return (
    <div className="my-2 p-2 lg:pl-6 overflow-auto">
      <p className="mb-4 text-beige">
        {selectedCharacterCostumes.length} costumes found for{" "}
        {currentCostume.character.en}
      </p>

      <div className="flex flex-wrap gap-2">
        {selectedCharacterCostumes.map((costume) => (
          <div
            key={costume.ids.costume}
            className="inline-flex flex-col justify-center items-center p-2 cursor-pointer relative group"
            onClick={() => setCostume(costume)}
          >
            <CostumeThumbnail
              src={`/character/thumbnails/${costume.ids.actor}_thumbnail.png`}
              alt={`${costume.costume.name.en} thumbnail`}
              rarity={RARITY[costume.costume.rarity]}
              imgClasses={classNames(
                "transition-all filter group-hover:brightness-100",
                currentCostume.ids.costume === costume.ids.costume
                  ? ""
                  : "brightness-50"
              )}
            />
            <span className="text-xs line-clamp-1 mt-1">
              {costume.costume.name.en ? costume.costume.name.en : "???"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
