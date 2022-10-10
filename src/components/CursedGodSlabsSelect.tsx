import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSettingsStore } from "@store/settings";

export default function CursedGodSlabsSelect() {
  const cursedGodSlabsPercent = useSettingsStore(
    (state) => state.cursedGodSlabsPercent
  );
  const setCursedGodSlabsPercent = useSettingsStore(
    (state) => state.setCursedGodSlabsPercent
  );

  return (
    <FormControl className="w-32 mt-8 md:mt-0">
      <InputLabel id="attribute-select-label">Cursed God Slabs</InputLabel>
      <Select
        labelId="attribute-select-label"
        value={cursedGodSlabsPercent}
        label="Type"
        onChange={(e) => setCursedGodSlabsPercent(Number(e.target.value))}
      >
        <MenuItem value="0">0%</MenuItem>
        <MenuItem value="33">33%</MenuItem>
        <MenuItem value="67">67%</MenuItem>
        <MenuItem value="100">100%</MenuItem>
      </Select>
    </FormControl>
  );
}
