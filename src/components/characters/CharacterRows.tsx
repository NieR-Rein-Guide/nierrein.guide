import { CDN_URL } from "@config/constants";
import React from "react";
import Link from "next/link";
import slug from "slugg";
import { character } from "@prisma/client";
import { useSettingsStore } from "@store/settings";
import { Tooltip } from "@mui/material";

function CharacterDiamond({
  character,
  active,
}: {
  character: character;
  active: boolean;
}): JSX.Element {
  return (
    <Tooltip title={character.name}>
      <Link
        href={`/characters/${slug(character.name)}`}
        passHref
        scroll={false}
      >
        <a className="relative">
          <div
            className={`pointer-events-auto overflow-hidden iso-bg ${
              active ? "active" : ""
            }`}
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
        </a>
      </Link>
    </Tooltip>
  );
}

export default function CharacterRows({
  characters,
  currentCharacter,
}: {
  characters: character[];
  currentCharacter: character;
}): JSX.Element {
  const showCharactersSelection = useSettingsStore(
    (state) => state.showCharactersSelection
  );

  const firstRow: character[] = [];
  const secondRow: character[] = [];

  characters.forEach((character, index) => {
    if (index % 2 == 1) {
      firstRow.push(character);
    } else {
      secondRow.push(character);
    }
  });

  if (!showCharactersSelection) {
    return null;
  }

  return (
    <div className="overflow-auto sm:self-center hidden xl:inline">
      <div className="relative h-28 mt-8 mx-20">
        <div className="flex gap-6 pointer-events-none">
          {firstRow.map((character) => (
            <React.Fragment key={character.character_id}>
              <CharacterDiamond
                key={character.character_id}
                character={character}
                active={
                  character.character_id === currentCharacter?.character_id
                }
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
                active={
                  character.character_id === currentCharacter?.character_id
                }
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
