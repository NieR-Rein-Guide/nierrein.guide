import { filterCostumes } from "@components/pages/costumes";
import { useInventoryStore } from "@store/inventory";
import { useSettingsStore } from "@store/settings";
import { hideSEASpoiler } from "@utils/hideSEASpoiler";
import { useEffect, useState } from "react";

interface IFilteredCostumes {
  costumes;
  characters;
}

export function useFilteredCostumes({
  costumes,
  characters = [],
}: IFilteredCostumes) {
  const region = useSettingsStore((state) => state.region);
  const [filteredCostumes, setFilteredCostumes] = useState(
    costumes.filter((costume) => {
      if (region === "SEA") {
        return hideSEASpoiler(costume.release_time);
      }
      return new Date() >= new Date(costume.release_time);
    })
  );
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const showInventory = useSettingsStore((state) => state.showInventory);
  const ownedCostumes = useInventoryStore((state) => state.costumes);

  useEffect(() => {
    setFilteredCostumes(
      filterCostumes(costumes, {
        ownedCostumes,
        showInventory,
        showUnreleasedContent,
        region,
      })
    );
  }, [
    ownedCostumes,
    showInventory,
    showUnreleasedContent,
    region,
    costumes,
    characters,
  ]);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) =>
        filteredCostumes.some(
          (costume) => costume.character_id === character.character_id
        )
      )
    );
  }, [filteredCostumes]);

  return {
    filteredCostumes,
    filteredCharacters,
  };
}
