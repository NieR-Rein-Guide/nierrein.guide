import { CostumeInfo, typedCharacters } from "@models/character";
import React, { Dispatch, SetStateAction } from "react";

function CharacterDiamond({
  costume,
  setCostume,
  active,
  labelTop,
}: {
  costume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
  active: boolean;
  labelTop: boolean;
}): JSX.Element {
  const onClick = () => {
    setCostume(costume);
  };

  return (
    <div className="relative">
      <div
        className={`absolute text-sm pointer-events-auto ${
          labelTop ? "bottom-20" : "top-20"
        } right-0 flex justify-center text-white ${
          active ? "" : "text-opacity-60"
        }`}
        style={{ width: "56px" }}
        onClick={onClick}
      >
        {costume.character}
      </div>
      <div
        className={`pointer-events-auto overflow-hidden iso-bg ${
          active ? "active" : ""
        }`}
        onClick={onClick}
      >
        <img
          style={{
            minWidth: "74px",
            maxWidth: "74px",
            minHeight: "74px",
            maxHeight: "74px",
          }}
          className="select-none"
          alt={costume.character}
          title={costume.character}
          src={costume.iconURL}
        />
      </div>
    </div>
  );
}

export default function CharacterRows({
  currentCostume,
  setCostume,
}: {
  currentCostume: CostumeInfo;
  setCostume: Dispatch<SetStateAction<CostumeInfo>>;
}): JSX.Element {
  const characters = Array.from(typedCharacters.values()).map(
    (chars) => chars[0]
  );

  const firstRow: CostumeInfo[] = [];
  const secondRow: CostumeInfo[] = [];
  characters.forEach((costume, index) => {
    if (index % 2 == 1) {
      firstRow.push(costume);
    } else {
      secondRow.push(costume);
    }
  });

  return (
    <div className="overflow-auto sm:self-center hidden md:inline">
      <div className="relative h-32 mt-20 mb-20 mx-20">
        <div className="flex gap-6 pointer-events-none">
          {firstRow.map((costume) => (
            <React.Fragment key={costume.id}>
              <CharacterDiamond
                {...{ costume, setCostume }}
                active={costume.character == currentCostume.character}
                labelTop={true}
              />
            </React.Fragment>
          ))}
        </div>
        <div
          className="absolute flex gap-6 pointer-events-none"
          style={{
            left: "-40px",
            top: "42px",
          }}
        >
          {secondRow.map((costume) => (
            <React.Fragment key={costume.id}>
              <CharacterDiamond
                {...{ costume, setCostume }}
                active={costume.character == currentCostume.character}
                labelTop={false}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
