import classNames from "classnames";
import SVG from "react-inlinesvg";

import statsIcons from "@utils/statsIcons";
import Stat from "./Stat";
import { statsColors } from "@utils/statsColors";

const LABELS = {
  hp: "HP",
  atk: "ATK",
  vit: "DEF",
  agi: "AGI",
};

export default function StatDisplay({ type, value }) {
  return (
    <div className={classNames("flex gap-4")}>
      <div className="flex items-center">
        <div className={classNames("relative mr-4")}>
          <SVG src="/decorations/frame-ability.svg" className="h-12 w-12" />
          <div className="h-16 w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <img alt={type} src={statsIcons[type]} />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <strong className="font-display text-xl text-beige">
            {LABELS[type]}
          </strong>
          <p
            className="text-left"
            style={{
              color: statsColors[type],
            }}
          >
            <Stat type={type} value={value} />
          </p>
        </div>
      </div>
    </div>
  );
}
