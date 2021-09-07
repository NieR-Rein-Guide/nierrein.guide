import { Costume } from "@models/types";
import RARITY from "@utils/rarity";
import React, { Dispatch, SetStateAction } from "react";

export default function CostumeSelect({
  currentCostume,
  setCostume,
  costumes,
}: {
  currentCostume: Costume;
  setCostume: Dispatch<SetStateAction<Costume>>;
  costumes: Costume[];
}): JSX.Element {
  const costumesByCharacter = costumes.reduce((acc, costume) => {
    if (!acc[costume.character.en]) {
      acc[costume.character.en] = [];
    }
    acc[costume.character.en].push(costume);
    return acc;
  }, {});

  return (
    <select
      className="bg-black text-white w-full"
      onChange={function (ev) {
        const newId = +ev.target.value;
        costumes.find((costume) => {
          if (costume.ids.costume === newId) {
            setCostume(costume);
            return true;
          }
        });
      }}
    >
      {Object.entries(costumesByCharacter).map(([name, costumes]) => (
        <optgroup key={name} label={name}>
          {(costumes as Costume[]).map((costume) => (
            <option key={costume.ids.costume} value={costume.ids.costume}>
              ({RARITY[costume.costume.rarity]}*) {costume.costume.name.en}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
