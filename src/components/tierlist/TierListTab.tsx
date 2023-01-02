import { useTabsContext, Tab } from "@reach/tabs";
import classNames from "classnames";

interface TierlistTabProps {
  children;
  index: number;
  className?: string | string[];
  style?: React.CSSProperties;
}

export default function TierlistTab({
  children,
  index,
  className,
  style,
}: TierlistTabProps): JSX.Element {
  const { selectedIndex } = useTabsContext();

  return (
    <Tab
      className={classNames(
        "p-4 transition-colors ease-out-cubic relative bordered",
        selectedIndex === index ? "active bg-beige" : "bg-grey-foreground",
        className
      )}
      style={style}
    >
      <span
        className={classNames(
          "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic line-clamp-1",
          selectedIndex === index ? "text-grey-lighter" : "text-beige"
        )}
      >
        {children}
      </span>
    </Tab>
  );
}
