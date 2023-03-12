import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
} from "@mui/material";
import { useSettingsStore } from "@store/settings";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import AwakeningLevelSelect from "./AwakeningLevelSelect";
import CursedGodSlabsSelect from "./CursedGodSlabsSelect";
import Radio from "./form/Radio";
import { RegionSelect } from "./RegionSelect";
import StoneSlabsSelect from "./StoneSlabsSelect";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const setShowUnreleasedContent = useSettingsStore(
    (state) => state.setShowUnreleasedContent
  );

  const isExalted = useSettingsStore((state) => state.isExalted);
  const setIsExalted = useSettingsStore((state) => state.setIsExalted);

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
        <div className="bg-grey-dark p-8 absolute bordered top-0 left-0 md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-xl space-y-8 overflow-y-auto pt-12 md:pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="flex items-center gap-x-2 text-3xl">
                <FiSettings /> Settings
              </h3>
              <p className="text-grey-detail text-xs">
                Settings are saved locally.
              </p>
            </div>
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="pr-12">
              <p className="text-beige">Region (experimental)</p>
              <p className="text-grey-detail text-xs">
                This setting will hide global costumes and weapons in databases
                if set to "SEA".
              </p>
            </div>
            <RegionSelect />
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
            <label htmlFor="exalt" className="text-beige cursor-pointer">
              Show Exalted stats by default
            </label>
            <Switch
              id="exalt"
              size="small"
              onChange={(e) => setIsExalted(e.target.checked)}
              checked={isExalted}
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
        </div>
      </Modal>
    </div>
  );
}
