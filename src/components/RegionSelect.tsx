import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSettingsStore } from "@store/settings";
import classNames from "classnames";

export function RegionSelect({ size = "medium", className = "w-32" }) {
  const region = useSettingsStore((state) => state.region);
  const setRegion = useSettingsStore((state) => state.setRegion);

  return (
    <FormControl size={size} className={classNames(className)}>
      <InputLabel id="select-region">Region</InputLabel>
      <Select
        labelId="select-region"
        id="select-region"
        value={region}
        label="Region"
        onChange={(e) => setRegion(e.target.value)}
      >
        <MenuItem value="GLOBAL">GLOBAL</MenuItem>
        <MenuItem value="JP">JP</MenuItem>
      </Select>
    </FormControl>
  );
}
