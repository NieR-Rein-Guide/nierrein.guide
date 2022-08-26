import { useTabsContext, Tab } from "@reach/tabs";
import classNames from "classnames";

export default function TierlistTab({ children, index }): JSX.Element {
  const { selectedIndex } = useTabsContext();

  return (
    <Tab
      className={classNames(
        "p-4 transition-colors ease-out-cubic relative bordered",
        selectedIndex === index ? "active bg-beige" : "bg-grey-foreground"
      )}
    >
      <span
        className={classNames(
          "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic",
          selectedIndex === index ? "text-grey-lighter" : "text-beige"
        )}
      >
        {children}
      </span>
    </Tab>
  );
}
