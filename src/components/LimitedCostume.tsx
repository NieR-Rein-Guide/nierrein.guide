import { Tooltip } from "@mui/material";
import classNames from "classnames";

interface ILimitedCostume {
  events: number[];
  textClasses: string | string[];
  isLogoOnly?: boolean;
}

export function LimitedCostume({
  events,
  textClasses = "font-display text-lg font-semibold text-rarity-4 leading-none",
  isLogoOnly,
}: ILimitedCostume) {
  return (
    <Tooltip
      title={
        <div className="flex flex-col text-center">
          <a href="#sources" className="text-blue-300 underline-dotted">
            Obtainable from {events.length} source
            {events.length > 1 ? "s" : ""}
          </a>

          <img
            loading="lazy"
            className="h-16 object-contain"
            src="/images/yudilbroke.webp"
            alt="Yudil broke"
          />
        </div>
      }
    >
      {(isLogoOnly && (
        <img
          loading="lazy"
          className="h-8 object-contain z-20 rounded-full"
          src="/icons/lunar-tear.png"
          alt="Limited"
        />
      )) || (
        <div className="inline-flex rounded-full bg-white bg-opacity-10 px-2 py-1 cursor-help">
          <div className="flex px-2">
            <img
              loading="lazy"
              className="h-4 object-contain"
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
