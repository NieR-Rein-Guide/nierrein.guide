import classNames from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import { Panel, PanelGroup } from "react-resizable-panels";
import { usePanelStore } from "@store/panels";
import { CostumePanel } from "@components/CostumePanel";
import ErrorBoundary from "@components/Error";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hasContainer?: boolean;
}

function Layout({
  children,
  className,
  hasContainer = true,
}: LayoutProps): JSX.Element {
  const panelCostumes = usePanelStore((state) => state.costumes);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <Header />

      <main
        className={classNames(
          "flex flex-col w-full flex-1",
          hasContainer ? "container" : "",
          className
        )}
      >
        <ErrorBoundary>
          <div>{children}</div>
        </ErrorBoundary>
      </main>

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

export default Layout;
