import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import SVG from "react-inlinesvg";

interface CheckboxProps {
  name?: string;
  value?: string | number | boolean;
  isChecked: boolean;
  setState?: Dispatch<SetStateAction<string | number | boolean>>;
  className?: string | string[];
  labelClassname?: string | string[];
}

export default function Radio({
  isChecked,
  setState,
  value,
  name,
  className,
  labelClassname,
}: CheckboxProps): JSX.Element {
  return (
    <label
      className={classNames("cursor-pointer inline-block relative", className)}
    >
      {name && (
        <span className={classNames("pl-10", labelClassname)}>{name}</span>
      )}
      <SVG
        className="transform transition-all absolute -top-1"
        src="/decorations/radio.svg"
      />
      <SVG
        className={classNames(
          "transform  transition-all absolute -top-1 ease-out-cubic",
          !isChecked && "opacity-0 scale-75",
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
