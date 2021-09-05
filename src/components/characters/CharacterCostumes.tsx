import { CostumeInfo, typedCharacters } from "@models/character";
import React, { Dispatch, SetStateAction } from "react";
import MamaStar from "@components/decorations/MamaStar";
import Star from "@components/decorations/Star";

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

  return (
    <div className="gap-2 my-2 p-2 lg:pl-6 overflow-auto h-40">
      {costumes.map(([stars, costumes]) => (
        <div className="flex flex-row" key={stars}>
          <span className="flex flex-row">
            {Array.from({ length: stars }).map((_, index) => (
              <div className="w-8 h-8" key={index}>
                <Star rarity={stars} />
              </div>
            ))}
            {Array.from({ length: 5 - stars }).map((_, index) => (
              <div className="w-8 h-8" key={index}></div>
            ))}
          </span>
          {costumes.map((costume) => (
            <div
              key={costume.id}
              className={`flex items-center border-beige border-2 p-2 ${
                currentCostume.id == costume.id ? "" : "border-opacity-30"
              }`}
              onClick={() => setCostume(costume)}
            >
              {costume.name.en}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
