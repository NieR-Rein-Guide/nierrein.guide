import Image from "next/image";
import { useTabsContext, Tab } from "@reach/tabs";
import classNames from "classnames";

export default function TierlistTab({ children, index, image }): JSX.Element {
  const { selectedIndex } = useTabsContext();

  return (
    <Tab
      className={classNames(
        "px-4 py-2 h-24 md:h-52 relative z-10",
        selectedIndex === index ? "border-2 border-beige" : null
      )}
    >
      <Image
        layout="fill"
        objectFit="cover"
        className="-z-1 filter brightness-50"
        src={image}
        alt={`${children} thumbnail`}
      />
      <h3 className="text-4xl md:text-5xl text-beige">{children}</h3>
    </Tab>
  );
}
