import Image from "next/image";
import { ElementTypes } from "@models/types";
// import { ElementTypes } from "@models/types";
// import darkIcon from "../../public/elements/dark.png";
// import lightIcon from "../../public/elements/light.png";
// import fireIcon from "../../public/elements/fire.png";
// import waterIcon from "../../public/elements/water.png";
// import windIcon from "../../public/elements/wind.png";

interface ElementProps {
  type: ElementTypes;
}

export default function Element({ type, ...props }: ElementProps): JSX.Element {
  const attribute = type.toLowerCase();

  return (
    <Image
      src={`/elements/${attribute}.png`}
      height={64}
      width={64}
      alt={type}
      {...props}
    />
  );
}
