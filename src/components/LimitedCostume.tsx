import { Tooltip } from "@mui/material";
import classNames from "classnames";

interface ILimitedCostume {
  events: number[];
  imgClasses?: string | string[];
  textClasses?: string | string[];
  isSmall?: boolean;
}

export function LimitedCostume({
  events,
  imgClasses,
  textClasses = "font-display text-lg font-semibold text-rarity-4 leading-none",
  isSmall,
}: ILimitedCostume) {
  return (
    <Tooltip
      title={
        <div className="flex flex-col text-center">
          {events && events.length > 0 && (
            <a href="#sources" className="text-blue-300 underline-dotted">
              Limited costume obtainable from {events.length} source
              {events.length > 1 ? "s" : ""}
            </a>
          )}

          <img
            loading="lazy"
            className={classNames("h-16 object-contain", imgClasses)}
            src="/images/yudilbroke.webp"
            alt="Yudil broke"
          />
        </div>
      }
    >
      {(isSmall && (
        <img
          loading="lazy"
          className={classNames(
            "h-5 object-contain z-20 rounded-full",
            imgClasses
          )}
          src="/icons/lunar-tear.png"
          alt="Limited"
        />
      )) || (
        <div className="inline-flex rounded-full bg-white bg-opacity-10 px-2 py-1 cursor-help">
          <div className="flex items-center gap-x-1 px-2">
            <img
              loading="lazy"
              className={classNames("h-4 object-contain", imgClasses)}
              src="/icons/lunar-tear.png"
              alt="Limited"
            />
            <p className={classNames(textClasses)}>Limited costume</p>
          </div>
        </div>
      )}
    </Tooltip>
  );
}
