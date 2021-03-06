import { character } from "@prisma/client";
import { useRouter } from "next/router";

export default function CostumeSelect({
  characters,
}: {
  characters: character[];
}): JSX.Element {
  const router = useRouter();

  function onSelect(character_id: string) {
    router.push(`/characters/${character_id}`);
  }

  return (
    <select
      className="bg-black text-white w-full"
      onChange={(e) => onSelect(e.target.value)}
    >
      {characters.map((character) => (
        <option key={character.character_id} value={character.character_id}>
          {character.name}
        </option>
      ))}
    </select>
  );
}
