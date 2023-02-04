import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames";

interface TierlistTabProps {
  children;
  index: number | string;
  className?: string | string[];
  style?: React.CSSProperties;
}

export default function TierlistTab({
  children,
  index,
  className,
  style,
}: TierlistTabProps): JSX.Element {
  return (
    <Tabs.Trigger
      value={index?.toString()}
      className={classNames(
        "p-4 transition-colors ease-out-cubic relative bordered",
        className
      )}
      style={style}
    >
      <span
        className={classNames(
          "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic line-clamp-1"
        )}
      >
        {children}
      </span>
    </Tabs.Trigger>
  );
}
