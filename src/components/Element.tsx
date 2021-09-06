import Image from "next/image";
import darkIcon from "../../public/elements/dark.png";
import lightIcon from "../../public/elements/light.png";
import fireIcon from "../../public/elements/fire.png";
import waterIcon from "../../public/elements/water.png";
import windIcon from "../../public/elements/wind.png";

export type ElementTypes = "dark" | "light" | "fire" | "water" | "wind";
export const ALL_ELEMENTS: ElementTypes[] = [
  "dark",
  "light",
  "fire",
  "water",
  "wind",
];

const elementsIcons = {
  dark: darkIcon,
  light: lightIcon,
  fire: fireIcon,
  water: waterIcon,
  wind: windIcon,
};

interface ElementProps {
  type: ElementTypes;
}

export default function Element({ type, ...props }: ElementProps): JSX.Element {
  return <Image src={elementsIcons[type]} alt={type} {...props} />;
}
