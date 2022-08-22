import { CDN_URL } from "@config/constants";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import slug from "slugg";
import { character } from "generated/dump";

function CharacterDiamond({
  character,
  active,
  labelTop,
}: {
  character: character;
  active: boolean;
  labelTop: boolean;
}): JSX.Element {
  return (
    <Link href={`/characters/${slug(character.name)}`} passHref scroll={false}>
      <a className="relative">
        <div
          className={`line-clamp-1 text-center absolute text-sm pointer-events-auto ${
            labelTop ? "bottom-20" : "top-20"
          } right-0 flex justify-center text-white ${
            active ? "" : "text-opacity-60"
          }`}
          style={{ width: "56px" }}
        >
          {character.name}
        </div>
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
  );
}

export default function CharacterRows({
  characters,
  currentCharacter,
}: {
  characters: character[];
  currentCharacter: character;
}): JSX.Element {
  const firstRow: character[] = [];
  const secondRow: character[] = [];

  characters.forEach((character, index) => {
    if (index % 2 == 1) {
      firstRow.push(character);
    } else {
      secondRow.push(character);
    }
  });

  return (
    <div className="overflow-auto sm:self-center hidden md:inline">
      <div className="relative h-48 mt-4 mx-20">
        <div className="flex gap-6 pointer-events-none">
          {firstRow.map((character) => (
            <React.Fragment key={character.character_id}>
              <CharacterDiamond
                key={character.character_id}
                character={character}
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
