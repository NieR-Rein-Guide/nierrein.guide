import { Costume } from "@models/types";
import React, { Dispatch, SetStateAction } from "react";

function getIconUrl(assetId: number): string {
  return `/ui/actor/${assetId}_01_actor_icon.png`;
}

function CharacterDiamond({
  costume,
  setCostume,
  active,
  labelTop,
}: {
  costume: Costume;
  setCostume: Dispatch<SetStateAction<Costume>>;
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
        {costume?.character?.en}
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
          alt={costume?.character?.en}
          title={costume?.character?.en}
          src={getIconUrl(costume.ids.actor)}
        />
      </div>
    </div>
  );
}

export default function CharacterRows({
  currentCostume,
  setCostume,
  costumes,
}: {
  currentCostume: Costume;
  setCostume: Dispatch<SetStateAction<Costume>>;
  costumes: Map<string, Costume>;
}): JSX.Element {
  const firstRow: Costume[] = [];
  const secondRow: Costume[] = [];

  const characters = Array.from(costumes.values());

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
            <React.Fragment key={costume?.ids?.costume}>
              <CharacterDiamond
                {...{ costume, setCostume }}
                active={costume?.character?.en == currentCostume?.character?.en}
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
            <React.Fragment key={costume?.ids?.costume}>
              <CharacterDiamond
                {...{ costume, setCostume }}
                active={costume?.character?.en == currentCostume?.character?.en}
                labelTop={false}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
