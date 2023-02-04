import { filterWeapons } from "@components/pages/weapons";
import { useInventoryStore } from "@store/inventory";
import { useSettingsStore } from "@store/settings";
import { hideSEASpoiler } from "@utils/hideSEASpoiler";
import { useEffect, useState } from "react";

interface FilteredWeapons {
  weapons;
}

export function useFilteredWeapons({ weapons }: FilteredWeapons) {
  const region = useSettingsStore((state) => state.region);
  const [filteredWeapons, setFilteredWeapons] = useState(
    weapons.filter((weapon) => {
      if (region === "SEA") {
        return hideSEASpoiler(weapon.release_time);
      }
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
      })
    );
  }, [ownedWeapons, showUnreleasedContent, showInventory, region, weapons]);

  return {
    filteredWeapons,
  };
}
