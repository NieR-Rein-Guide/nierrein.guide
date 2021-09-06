import { CostumeInfo, typedCharacters } from "@models/character";
import React, { Dispatch, SetStateAction } from "react";
import Star from "@components/decorations/Star";
import CostumeThumbnail from "@components/CostumeThumbnail";
import classNames from "classnames";

export default function CharacterCostumes({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
}): JSX.Element {
  const sorted = typedCharacters
    .get(currentCostume.character)
    .sort((a, b) => a.stars - b.stars);
  const byStars = sorted.reduce((acc, elem) => {
    if (acc.has(elem.stars)) {
      acc.get(elem.stars).push(elem);
    } else {
      acc.set(elem.stars, [elem]);
    }
    return acc;
  }, new Map<number, CostumeInfo[]>());
  const costumes = Array.from(byStars.entries());

  const allCostumes = costumes.map((costumes) => costumes[1]).flat();

  return (
    <div className="my-2 p-2 lg:pl-6 overflow-auto">
      <p className="mb-4 text-beige">
        {allCostumes.length} costumes found for {currentCostume.character}
      </p>

      <div className="flex gap-2">
        {allCostumes.map((costume) => (
          <div
            key={costume.id}
            className="inline-flex flex-col justify-center items-center p-2 cursor-pointer relative group"
            onClick={() => setCostume(costume)}
          >
            <CostumeThumbnail
              src={costume.thumbnailURL}
              alt={`${costume.name.en} thumbnail`}
              rarity={costume.stars}
              imgClasses={classNames(
                "transition-all filter group-hover:brightness-100",
                currentCostume.id === costume.id ? "" : "brightness-50"
              )}
            />
            <span className="text-xs line-clamp-1 mt-1">{costume.name.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
