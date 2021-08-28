import classNames from "classnames";
import SVG from "react-inlinesvg";

export default function Lines({
  children,
  className = "",
  containerClass = "",
}): JSX.Element {
  return (
    <div
      className={classNames(
        "flex justify-between items-center w-full",
        className
      )}
    >
      <div className="hidden lg:flex justify-start">
        <SVG src="/decorations/line-left-arrow.svg" />
      </div>
      <div className={classNames("flex relative w-full px-7", containerClass)}>
        {children}
      </div>
      <div className="hidden lg:flex justify-end">
        <SVG src="/decorations/line-right-arrow.svg" />
      </div>
    </div>
  );
}
