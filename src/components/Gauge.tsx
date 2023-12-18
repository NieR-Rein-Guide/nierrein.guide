import { Tooltip } from "@mui/material";
import getGaugeLevel from "@utils/getGaugeLevel";
import skillGaugeColors, {
  skillGaugeBorderColors,
} from "@utils/skillGaugeColors";
import classNames from "classnames";
import Image from "next/image";

interface GaugeProps {
  cooldown_time: number;
  gauge_rise_speed: string;
}

export function Gauge({ cooldown_time, gauge_rise_speed }: GaugeProps) {
  return (
    <Tooltip
      enterTouchDelay={0}
      className="cursor-help"
      title={
        <div className="flex flex-col gap-y-2">
          <p className="text-xs text-center">
            A lower number means that it charges faster
            <br />
            <span className={skillGaugeColors["C"]}>C Fastest</span> -{" "}
            <span className={skillGaugeColors["B"]}>B Medium</span> -{" "}
            <span className={skillGaugeColors["A"]}>A Slowest</span>
          </p>
          <div
            className={classNames(
              "px-2 py-1 mr-2 relative bg-grey-dark border",
              skillGaugeColors[gauge_rise_speed],
              skillGaugeBorderColors[gauge_rise_speed]
            )}
          >
            Base: {getGaugeLevel(cooldown_time)} ({cooldown_time})
          </div>
          <div
            className={classNames(
              "px-2 py-1 mr-2 relative relative bg-grey-dark border",
              skillGaugeColors[getGaugeLevel(cooldown_time * 0.8)],
              skillGaugeBorderColors[getGaugeLevel(cooldown_time * 0.8)]
            )}
          >
            Max asc: {getGaugeLevel(cooldown_time * 0.8)} ({cooldown_time * 0.8}
            )
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <Image
                className={classNames(
                  "transform transition-transform ease-out-cubic"
                )}
                layout="fixed"
                width={24}
                height={24}
                alt=""
                src="/decorations/costume_full_asc.png"
              />
            </div>
          </div>

          <div>
            <span className="block">
              <span className="text-beige">Weapon skill</span> fills 250 gauge
              points.
            </span>
            <span className="block text-beige">Auto-attacks</span>
            <span className="block ml-2">a 3 chain is 50+50+50 (150)</span>
            <span className="block ml-2">a 4 chain is 50+50+50+25 (175)</span>
            <span className="block ml-2">
              a 5 chain is 50+50+50+25+25 (200)
            </span>
            <span className="block">
              <span className="text-beige">Companion</span> skill fills 400
              gauge points.
            </span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-start text-xs mt-2 w-20">
        <div
          className={classNames(
            "px-2 py-1 mr-2 w-full text-center relative bg-grey-dark border",
            skillGaugeColors[gauge_rise_speed],
            skillGaugeBorderColors[gauge_rise_speed]
          )}
        >
          <div className="absolute -top-2 -right-2 z-20 flex items-center justify-center bg-grey-lighter text-beige border border-beige rounded-full h-4 w-4 font-labor">
            ?
          </div>
          Gauge: {getGaugeLevel(cooldown_time)}
        </div>

        <div className="flex justify-between w-full">
          <span
            className={classNames(
              "border border-dotted px-1 relative bg-grey-dark flex-1",
              skillGaugeColors[getGaugeLevel(cooldown_time)],
              skillGaugeBorderColors[getGaugeLevel(cooldown_time)]
            )}
          >
            {cooldown_time}
          </span>
          <span
            className={classNames(
              "border border-dotted px-1 relative bg-grey-dark",
              skillGaugeColors[getGaugeLevel(cooldown_time * 0.8)],
              skillGaugeBorderColors[getGaugeLevel(cooldown_time * 0.8)]
            )}
          >
            {cooldown_time * 0.8}
          </span>
        </div>
      </div>
    </Tooltip>
  );
}
