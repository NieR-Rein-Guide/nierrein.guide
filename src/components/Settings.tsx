import {
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  Select,
} from "@mui/material";
import { useSettingsStore } from "@store/settings";
import AwakeningLevelSelect from "./AwakeningLevelSelect";
import CursedGodSlabsSelect from "./CursedGodSlabsSelect";
import StoneSlabsSelect from "./StoneSlabsSelect";
import Checkbox from "@components/form/Checkbox";

export default function SettingsModal() {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const setShowUnreleasedContent = useSettingsStore(
    (state) => state.setShowUnreleasedContent
  );
  const showInventory = useSettingsStore((state) => state.showInventory);
  const setShowInventory = useSettingsStore((state) => state.setShowInventory);
  const isExalted = useSettingsStore((state) => state.isExalted);
  const setIsExalted = useSettingsStore((state) => state.setIsExalted);
  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );
  const setDatabaseDisplayType = useSettingsStore(
    (state) => state.setDatabaseDisplayType
  );

  return (
    <>
      <Checkbox
        label="Only inventory"
        isChecked={showInventory}
        setState={(e) => setShowInventory(e.target.checked)}
      />
      <div className="flex justify-between bg-grey-dark p-2 border border-beige border-opacity-50">
        <label htmlFor="exalt" className="text-beige cursor-pointer">
          Exalted/Refined
        </label>
        <Switch
          id="exalt"
          size="small"
          onChange={(e) => setIsExalted(e.target.checked)}
          checked={isExalted}
        />
      </div>
      <AwakeningLevelSelect />
      <StoneSlabsSelect />
      <CursedGodSlabsSelect />
      <div className="bg-grey-dark border border-red-300 border-opacity-50 p-2 flex justify-between">
        <label htmlFor="spoilers" className="text-beige cursor-pointer">
          Show spoilers
        </label>
        <Switch
          id="spoilers"
          size="small"
          onChange={(e) => setShowUnreleasedContent(e.target.checked)}
          checked={showUnreleasedContent}
        />
      </div>
      <FormControl className="bg-grey-dark hidden xl:flex">
        <InputLabel id="attribute-select-label">View</InputLabel>
        <Select
          labelId="view-select"
          value={databaseDisplayType}
          label="Type"
          onChange={(e) => setDatabaseDisplayType(e.target.value)}
        >
          <MenuItem value="table">Table (Filtering)</MenuItem>
          <MenuItem value="grid">Grid</MenuItem>
          <MenuItem value="compact">Compact</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
