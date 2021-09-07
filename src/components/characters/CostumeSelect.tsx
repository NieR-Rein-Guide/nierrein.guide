import { Costume, typedCharacters } from "@models/character";
import React, { Dispatch, SetStateAction } from "react";

export default function CostumeSelect({
  currentCostume,
  setCostume,
}: {
  currentCostume: Costume;
  setCostume: Dispatch<SetStateAction<Costume>>;
}): JSX.Element {
  const characters = Array.from(typedCharacters.values()).map(
    (chars) => chars[0]
  );

  return (
    <select
      className="bg-black text-white w-full"
      onChange={function (ev) {
        const newId = +ev.target.value;
        Array.from(typedCharacters.values()).find((values) =>
          values.find((cost) => {
            if (cost.id == newId) {
              setCostume(cost);
              return true;
            }
          })
        );
      }}
    >
      {characters.map((costume) => (
        <optgroup key={costume.character} label={costume.character}>
          {typedCharacters.get(costume.character).map((costume) => (
            <option key={costume.id} value={costume.id.toString()}>
              ({costume.stars}*) {costume.name.en}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
