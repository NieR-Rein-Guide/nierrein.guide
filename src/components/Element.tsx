import Image from "next/image";
import { ElementTypes } from "@models/types";
// import { ElementTypes } from "@models/types";
// import darkIcon from "../../public/elements/dark.png";
// import lightIcon from "../../public/elements/light.png";
// import fireIcon from "../../public/elements/fire.png";
// import waterIcon from "../../public/elements/water.png";
// import windIcon from "../../public/elements/wind.png";

interface ElementProps {
  type: ElementTypes | string;
  size?: number;
}

export default function Element({
  type,
  size = 64,
  ...props
}: ElementProps): JSX.Element {
  const attribute = type && type.toLowerCase();

  return (
    <Image
      src={`/elements/${attribute}.png`}
      height={size}
      width={size}
      alt={type}
      {...props}
    />
  );
}
