import { CDN_URL } from "@config/constants";
import { character } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

function CharacterDiamond({
  character,
  active,
  labelTop,
  onClick,
}: {
  character: character;
  active: boolean;
  labelTop: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <button className="relative">
      <div
        className={`line-clamp-1 text-center absolute text-sm pointer-events-auto ${
          labelTop ? "bottom-20" : "top-20"
        } right-0 flex justify-center text-white ${
          active ? "" : "text-opacity-60"
        }`}
        style={{ width: "56px" }}
        onClick={onClick}
      >
        {character.name}
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
          className="select-none object-none"
          alt={character.name}
          title={character.name}
          src={`${CDN_URL}${character.image_path}`}
        />
      </div>
    </button>
  );
}

export default function CharacterRows({
  characters,
  currentCharacter,
}: {
  characters: character[];
  currentCharacter: character;
}): JSX.Element {
  const router = useRouter();
  const firstRow: character[] = [];
  const secondRow: character[] = [];

  characters.forEach((character, index) => {
    if (index % 2 == 1) {
      firstRow.push(character);
    } else {
      secondRow.push(character);
    }
  });

  function onSelect(character: character) {
    router.push(`/characters/${character.character_id}`);
  }

  return (
    <div className="overflow-auto sm:self-center hidden md:inline">
      <div className="relative h-32 mt-20 mb-20 mx-20">
        <div className="flex gap-6 pointer-events-none">
          {firstRow.map((character) => (
            <React.Fragment key={character.character_id}>
              <CharacterDiamond
                key={character.character_id}
                character={character}
                onClick={() => onSelect(character)}
                active={
                  character.character_id === currentCharacter?.character_id
                }
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
          {secondRow.map((character) => (
            <React.Fragment key={character.character_id}>
              <CharacterDiamond
                key={character.character_id}
                character={character}
                onClick={() => onSelect(character)}
                active={
                  character.character_id === currentCharacter?.character_id
                }
                labelTop={false}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
