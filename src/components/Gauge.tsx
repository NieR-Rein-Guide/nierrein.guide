import { Tooltip } from "@mui/material";
import { costume_skill } from "@prisma/client";
import getGaugeLevel from "@utils/getGaugeLevel";
import skillGaugeColors, {
  skillGaugeBorderColors,
} from "@utils/skillGaugeColors";
import classNames from "classnames";
import Image from "next/image";

type GaugeProps = costume_skill & {
  isWeapon?: boolean;
};

export function Gauge({
  isWeapon,
  cooldown_time,
  gauge_rise_speed,
}: GaugeProps) {
  return (
    <div className="flex  items-end text-xs mt-2">
      <div
        className={classNames(
          "px-2 py-1 mr-2",
          isWeapon ? "bg-brown" : "relative bg-grey-dark border",
          !isWeapon && skillGaugeColors[gauge_rise_speed],
          !isWeapon && skillGaugeBorderColors[gauge_rise_speed]
        )}
      >
        {!isWeapon && `Gauge: ${getGaugeLevel(cooldown_time)}`}
        {isWeapon && `Cooldown: ${cooldown_time / 30}s`}

        {!isWeapon && (
          <Tooltip
            enterTouchDelay={0}
            className="cursor-help"
            title={
              <div className="flex flex-col gap-y-2">
                <p className="text-xs text-center">
                  A lower number means that it charges faster
                  <br />
                  <span className={skillGaugeColors["C"]}>
                    C Fastest
                  </span> -{" "}
                  <span className={skillGaugeColors["B"]}>B Medium</span> -{" "}
                  <span className={skillGaugeColors["A"]}>A Slowest</span>
                </p>
                <div
                  className={classNames(
                    "px-2 py-1 mr-2",
                    isWeapon ? "bg-brown" : "relative bg-grey-dark border",
                    !isWeapon && skillGaugeColors[gauge_rise_speed],
                    !isWeapon && skillGaugeBorderColors[gauge_rise_speed]
                  )}
                >
                  Base: {getGaugeLevel(cooldown_time)} ({cooldown_time})
                </div>
                <div
                  className={classNames(
                    "px-2 py-1 mr-2 relative",
                    isWeapon ? "bg-brown" : "relative bg-grey-dark border",
                    !isWeapon &&
                      skillGaugeColors[getGaugeLevel(cooldown_time * 0.8)],
                    !isWeapon &&
                      skillGaugeBorderColors[getGaugeLevel(cooldown_time * 0.8)]
                  )}
                >
                  Max asc: {getGaugeLevel(cooldown_time * 0.8)} (
                  {cooldown_time * 0.8})
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
                <p className="text-xs">a skill fills 250 gauge points.</p>
                <p className="text-xs">an auto attack fills 50 gauge points.</p>
                <p className="text-xs">
                  a companion skill fills 400 gauge points.
                </p>
              </div>
            }
          >
            <span className="absolute -top-2 -right-2 z-20 flex items-center justify-center bg-white text-black rounded-full h-4 w-4 text-xs font-labor">
              ?
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
