import classNames from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import { Panel, PanelGroup } from "react-resizable-panels";
import { usePanelStore } from "@store/panels";
import { CostumePanel } from "@components/CostumePanel";
import ErrorBoundary from "@components/Error";
import Settings from "@components/Settings";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { MdFilterAlt, MdViewColumn, MdViewComfy } from "react-icons/md";
import { useSettingsStore } from "@store/settings";

interface LayoutProps {
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  hasContainer?: boolean;
}

function DatabaseLayout({
  children,
  className,
  hasContainer = true,
  aside,
}: LayoutProps): JSX.Element {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const panelCostumes = usePanelStore((state) => state.costumes);
  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );
  const setDatabaseDisplayType = useSettingsStore(
    (state) => state.setDatabaseDisplayType
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <Header />

      <div className="grid grid-cols-1 xl:mb-0 xl:grid-cols-12 gap-2">
        <div className="flex justify-center xl:hidden">
          <ToggleButtonGroup
            value={databaseDisplayType}
            exclusive
            onChange={(e, newValue) => setDatabaseDisplayType(newValue)}
            aria-label="View"
          >
            <ToggleButton
              defaultChecked={databaseDisplayType === "table"}
              value="table"
              aria-label="table"
            >
              <MdFilterAlt /> <p className="ml-2">Table</p>
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid">
              <MdViewColumn /> <p className="ml-2">Comfy</p>
            </ToggleButton>
            <ToggleButton
              defaultChecked={databaseDisplayType === "compact"}
              value="compact"
              aria-label="compact"
            >
              <MdViewComfy /> <p className="ml-2">Compact</p>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="mx-4 mb-4 xl:hidden"
          color="primary"
          variant="contained"
          component="label"
          startIcon={<FiFilter />}
        >
          <span>Filter & Stats settings</span>
        </Button>
        <aside
          className={classNames(
            isFiltersOpen
              ? "border-l-0 rounded-tr-md rounded-br-md"
              : "opacity-0 pointer-events-none xl:opacity-100 xl:pointer-events-auto",
            "fixed mt-12 flex flex-col gap-y-4 px-4 xl:sticky xl:top-8 xl:flex xl:col-span-2 xl:self-start z-50 transition-all ease-out-cubic bg-grey-dark py-2 border border-beige border-opacity-20 max-h-[70vh] overflow-y-auto"
          )}
        >
          {aside}
          <Settings />
        </aside>
        <main
          className={classNames(
            "flex flex-col w-full flex-1 xl:col-span-10",
            hasContainer ? "container" : "",
            className
          )}
        >
          <ErrorBoundary>
            <div>{children}</div>
          </ErrorBoundary>
        </main>
      </div>

      <div className="fixed bottom-0 right-0 z-panels">
        <PanelGroup
          autoSaveId="panels"
          direction="horizontal"
          id="1"
          key="1"
          className="gap-x-6 items-end"
        >
          {panelCostumes.map((costumeId) => (
            <Panel key={costumeId} id={costumeId}>
              <CostumePanel costumeId={costumeId} />
            </Panel>
          ))}
        </PanelGroup>
      </div>

      <Footer />
    </div>
  );
}

export default DatabaseLayout;
