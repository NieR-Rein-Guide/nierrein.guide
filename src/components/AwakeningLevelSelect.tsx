import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSettingsStore } from "@store/settings";

export default function AwakeningLevelSelect() {
  const awakeningLevel = useSettingsStore((state) => state.awakeningLevel);
  const setAwakeningLevel = useSettingsStore(
    (state) => state.setAwakeningLevel
  );

  return (
    <FormControl className="w-32 mt-8 md:mt-0">
      <InputLabel id="attribute-select-label">Awakening Level</InputLabel>
      <Select
        labelId="attribute-select-label"
        value={awakeningLevel}
        label="Type"
        onChange={(e) => setAwakeningLevel(Number(e.target.value))}
      >
        <MenuItem value="0">Lv. 0</MenuItem>
        <MenuItem value="1">Lv. 1</MenuItem>
        <MenuItem value="2">Lv. 2</MenuItem>
        <MenuItem value="3">Lv. 3</MenuItem>
        <MenuItem value="4">Lv. 4</MenuItem>
        <MenuItem value="5">Lv. 5</MenuItem>
      </Select>
    </FormControl>
  );
}
