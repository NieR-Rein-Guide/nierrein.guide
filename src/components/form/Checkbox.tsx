import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import SVG from "react-inlinesvg";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  setState: Dispatch<SetStateAction<any>>;
}

export default function Checkbox({
  isChecked,
  setState,
  label,
}: CheckboxProps): JSX.Element {
  return (
    <label className="flex flex-col cursor-pointer relative">
      <div className="text-beige">{label}</div>
      <SVG
        className="transform transition-all absolute -top-1"
        src="/decorations/checkbox.svg"
      />
      <SVG
        className={classNames(
          "transform transition-all absolute -top-1 ease-out-cubic",
          !isChecked && "opacity-0 scale-75",
          isChecked && "opacity-100 scale-100"
        )}
        src="/decorations/checkbox_checked.svg"
      />
      <input
        className="sr-only"
        onChange={setState}
        type="checkbox"
        checked={isChecked}
      />
    </label>
  );
}
