import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import SVG from "react-inlinesvg";

interface CheckboxProps {
  name?: string;
  value?: string | number | boolean;
  isChecked: boolean;
  setState: Dispatch<SetStateAction<string | number | boolean>>;
}

export default function Checkbox({
  isChecked,
  setState,
  value,
  name,
}: CheckboxProps): JSX.Element {
  return (
    <label className="cursor-pointer relative">
      {name && <span className="pl-10">{name}</span>}
      <SVG
        className="transform transition-all absolute -top-1"
        src="/decorations/radio.svg"
      />
      <SVG
        className={classNames(
          "transform transition-all absolute -top-1 opacity-0 scale-75 ease-out-cubic",
          isChecked && "opacity-100 scale-100"
        )}
        src="/decorations/radio_checked.svg"
      />
      <input
        className="sr-only"
        onChange={(e) => setState(value ?? !!e.target.value)}
        type="radio"
        checked={isChecked}
      />
    </label>
  );
}
