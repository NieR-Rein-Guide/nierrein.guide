import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import SVG from "react-inlinesvg";

interface CheckboxProps {
  children: JSX.Element[] | JSX.Element;
  isChecked: boolean;
  setState: Dispatch<SetStateAction<any>>;
}

export default function Checkbox({
  isChecked,
  setState,
  children,
}: CheckboxProps): JSX.Element {
  return (
    <label className="cursor-pointer relative">
      <div className="pl-10 flex justify-center items-center">{children}</div>
      <SVG
        className="transform transition-all absolute -top-1"
        src="/decorations/checkbox.svg"
      />
      <SVG
        className={classNames(
          "transform transition-all absolute -top-1 opacity-0 scale-75 ease-out-cubic",
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
