import { useTabsContext, Tab } from "@reach/tabs";
import classNames from "classnames";

export default function TierlistTab({ children, index }): JSX.Element {
  const { selectedIndex } = useTabsContext();

  return (
    <Tab
      className={classNames(
        "p-4 transition-colors ease-out-cubic relative bordered",
        selectedIndex === index ? "bg-grey-foreground" : "bg-beige"
      )}
    >
      <span
        className={classNames(
          "font-display font-bold text-lg tracking-wider transition-colors ease-out-cubic",
          selectedIndex === index ? "text-beige" : "text-grey-foreground"
        )}
      >
        {children}
      </span>
    </Tab>
  );
}
