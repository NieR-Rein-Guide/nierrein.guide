import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSettingsStore } from "@store/settings";

export default function StoneSlabsSelect() {
  const stoneTowerSlabsPercent = useSettingsStore(
    (state) => state.stoneTowerSlabsPercent
  );
  const setStoneTowerSlabsPercent = useSettingsStore(
    (state) => state.setStoneTowerSlabsPercent
  );

  return (
    <FormControl className="bg-grey-dark">
      <InputLabel id="attribute-select-label">Stone Monument Slabs</InputLabel>
      <Select
        labelId="attribute-select-label"
        value={stoneTowerSlabsPercent}
        label="Type"
        onChange={(e) => setStoneTowerSlabsPercent(Number(e.target.value))}
      >
        <MenuItem value="0">0%</MenuItem>
        <MenuItem value="33">33%</MenuItem>
        <MenuItem value="67">67%</MenuItem>
        <MenuItem value="100">100%</MenuItem>
      </Select>
    </FormControl>
  );
}
