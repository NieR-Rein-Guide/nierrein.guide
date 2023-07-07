import { filterWeapons } from "@components/pages/weapons";
import { character } from "@prisma/client";
import { useInventoryStore } from "@store/inventory";
import { useSettingsStore } from "@store/settings";
import { useEffect, useState } from "react";

interface FilteredWeapons {
  weapons;
  filteredCharacters: character[];
}

export function useFilteredWeapons({
  weapons,
  filteredCharacters,
}: FilteredWeapons) {
  const region = useSettingsStore((state) => state.region);
  const [filteredWeapons, setFilteredWeapons] = useState(
    weapons.filter((weapon) => {
      return new Date() >= new Date(weapon.release_time);
    })
  );

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const showInventory = useSettingsStore((state) => state.showInventory);
  const ownedWeapons = useInventoryStore((state) => state.weapons);

  useEffect(() => {
    setFilteredWeapons(
      filterWeapons(weapons, {
        ownedWeapons,
        showUnreleasedContent,
        showInventory,
        region,
        filteredCharacters,
      })
    );
  }, [
    ownedWeapons,
    showUnreleasedContent,
    showInventory,
    region,
    filteredCharacters,
  ]);

  return {
    filteredWeapons,
  };
}
