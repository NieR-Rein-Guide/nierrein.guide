import {
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Switch,
} from "@mui/material";
import { useSettingsStore } from "@store/settings";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import AwakeningLevelSelect from "./AwakeningLevelSelect";
import CursedGodSlabsSelect from "./CursedGodSlabsSelect";
import Radio from "./form/Radio";
import StoneSlabsSelect from "./StoneSlabsSelect";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const setShowUnreleasedContent = useSettingsStore(
    (state) => state.setShowUnreleasedContent
  );

  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );
  const setDatabaseDisplayType = useSettingsStore(
    (state) => state.setDatabaseDisplayType
  );

  const showCharactersSelection = useSettingsStore(
    (state) => state.showCharactersSelection
  );
  const setShowCharactersSelection = useSettingsStore(
    (state) => state.setShowCharactersSelection
  );

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="Open settings"
        component="label"
        startIcon={<FiSettings size={20} />}
      >
        Open settings
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-grey-dark p-8 absolute bordered top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl space-y-8">
          <div className="mb-4">
            <h3 className="flex items-center gap-x-2 text-3xl">
              <FiSettings /> Settings
            </h3>
            <p className="text-grey-detail text-xs">
              Settings are saved locally.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <label htmlFor="spoilers" className="text-beige cursor-pointer">
              Show spoilers/unreleased items
            </label>
            <Switch
              id="spoilers"
              size="small"
              onChange={(e) => setShowUnreleasedContent(e.target.checked)}
              checked={showUnreleasedContent}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <label htmlFor="spoilers" className="text-beige cursor-pointer">
              Show old characters selection on costume page
            </label>
            <Switch
              id="spoilers"
              size="small"
              onChange={(e) => setShowCharactersSelection(e.target.checked)}
              checked={showCharactersSelection}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="pr-12">
              <p className="text-beige">Awakening level</p>
              <p className="text-grey-detail text-xs">
                Will affect the displayed statistics, the stat will be{" "}
                <u>underlined</u>.
              </p>
            </div>
            <AwakeningLevelSelect />
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="pr-12">
              <p className="text-beige">Stone Tower Monument Slabs</p>
              <p className="text-grey-detail text-xs">
                Will affect the displayed statistics, the stat will be{" "}
                <u>underlined</u>.
              </p>
            </div>
            <StoneSlabsSelect />
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="pr-12">
              <p className="text-beige">Cursed God Monument Slabs</p>
              <p className="text-grey-detail text-xs">
                Will affect the displayed statistics, the stat will be{" "}
                <u>underlined</u>.
              </p>
            </div>
            <CursedGodSlabsSelect />
          </div>
          <div>
            <p className="text-beige">Database display</p>
            <p className="text-grey-detail text-xs">
              The grid view is preferable on mobile. Filtering on Table view is
              better on desktop.
            </p>
            <div className="flex space-x-8 mt-4">
              <Radio
                name="Table"
                value="table"
                isChecked={databaseDisplayType === "table"}
                setState={setDatabaseDisplayType}
                labelClassname="inline-block text-center md:w-24"
              />
              <Radio
                name="Grid"
                value="grid"
                isChecked={databaseDisplayType === "grid"}
                setState={setDatabaseDisplayType}
                labelClassname="inline-block text-center md:w-24"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
