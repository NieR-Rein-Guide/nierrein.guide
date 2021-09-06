import { CostumeInfo, typedCharacters } from "@models/character";
import React, { Dispatch, SetStateAction } from "react";
import Star from "@components/decorations/Star";
import CostumeThumbnail from "@components/CostumeThumbnail";

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

      <div className="grid grid-cols-6 gap-2">
        {allCostumes.map((costume) => (
          <div
            key={costume.id}
            className={`inline-flex flex-col justify-center items-center border-beige border-2 p-2 cursor-pointer ${
              currentCostume.id == costume.id ? "" : "border-opacity-30"
            }`}
            onClick={() => setCostume(costume)}
          >
            <CostumeThumbnail
              src={costume.thumbnailURL}
              alt={`${costume.name.en} thumbnail`}
            />
            <span className="text-xs line-clamp-1 mt-1">{costume.name.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
