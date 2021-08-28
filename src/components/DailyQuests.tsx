import { GAME_TIMEZONE } from "@config/constants";
import { utcToZonedTime } from "date-fns-tz/esm";
import format from "date-fns/esm/format";
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import Image from "next/image";
import Lines from "@components/decorations/Lines";
import BtnTertiary from "@components/btn/tertiary";

import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";

// used for listing all daily types
const DAYS_OF_WEEK = Array.from(Array(7).keys());

type DailyInfo = {
  gems: string[];
  weaponUpgrades: string[];
};

interface DailyRowProps {
  dayOfWeek: Date;
}

const dailyTypes = (dayOfWeek: number): DailyInfo => {
  switch (dayOfWeek) {
    case 0:
      return {
        gems: ["topaz", "tanzanite"],
        weaponUpgrades: ["greatsword", "sword"],
      };
    case 1:
      return {
        gems: ["emerald"],
        weaponUpgrades: ["greatsword", "sword"],
      };
    case 2:
      return {
        gems: ["ruby"],
        weaponUpgrades: ["greatsword", "sword"],
      };
    case 3:
      return {
        gems: ["aquamarine"],
        weaponUpgrades: ["greatsword", "sword"],
      };
    case 4:
      return {
        gems: ["topaz"],
        weaponUpgrades: ["greatsword", "sword"],
      };
    case 5:
      return {
        gems: ["tanzanite"],
        weaponUpgrades: ["spear", "fist"],
      };
    case 6:
      return {
        gems: ["aquamarine", "emerald", "ruby"],
        weaponUpgrades: ["greatsword", "sword"],
      };
  }
};

import tanzaniteIcon from "../../public/ui/material/material321011_standard.png";
import topazIcon from "../../public/ui/material/material321010_standard.png";
import emeraldIcon from "../../public/ui/material/material321009_standard.png";
import aquamarineIcon from "../../public/ui/material/material321008_standard.png";
import rubyIcon from "../../public/ui/material/material321007_standard.png";

const gemToIcon = (gem: string) => {
  switch (gem) {
    case "tanzanite":
      return tanzaniteIcon;
    case "topaz":
      return topazIcon;
    case "emerald":
      return emeraldIcon;
    case "aquamarine":
      return aquamarineIcon;
    case "ruby":
      return rubyIcon;
  }
};

import swordIcon from "../../public/ui/material/material321001_standard.png";
import greatswordIcon from "../../public/ui/material/material321002_standard.png";
import spearIcon from "../../public/ui/material/material321003_standard.png";
import fistIcon from "../../public/ui/material/material321004_standard.png";
import staffIcon from "../../public/ui/material/material321005_standard.png";
import gunIcon from "../../public/ui/material/material321006_standard.png";
import classNames from "classnames";

const weaponToIcon = (weapon: string) => {
  switch (weapon) {
    case "sword":
      return swordIcon;
    case "greatsword":
      return greatswordIcon;
    case "spear":
      return spearIcon;
    case "fist":
      return fistIcon;
    case "staff":
      return staffIcon;
    case "gun":
      return gunIcon;
  }
};

export { weaponToIcon };

function DailyRow({ dayOfWeek }: DailyRowProps): JSX.Element {
  const dailyInfo = dailyTypes(dayOfWeek.getDay());
  const gems = dailyInfo.gems;
  const weaponUpgrades = dailyInfo.weaponUpgrades;

  return (
    <div className="flex justify-center w-full">
      <div className="flex place-items-center">
        <div className="flex justify-center flex-wrap">
          {gems.map((gem, index) => (
            <div key={index} className="relative h-20 w-20">
              <Image src={gemToIcon(gem)} alt={`${gem} icon`} title={gem} />
            </div>
          ))}
        </div>

        <SVG src="/decorations/squares.svg" className="text-beige h-4 mx-4" />

        <div className="flex justify-center flex-wrap">
          {weaponUpgrades.map((weaponUpgrade, index) => (
            <div key={index} className="relative h-20 w-20">
              <Image
                src={weaponToIcon(weaponUpgrade)}
                alt={`${weaponUpgrade} icon`}
                title={weaponUpgrade}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DailyInfo(): JSX.Element {
  const daysOfWeek = DAYS_OF_WEEK.map((day) => {
    let currentDate = new Date();
    currentDate = utcToZonedTime(
      currentDate.setDate(currentDate.getDate() + day),
      GAME_TIMEZONE
    );

    return currentDate;
  });

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  return (
    <section className="flex items-start flex-col">
      <h2 className="overlap">Daily Quests</h2>

      <Lines
        className="flex h-40"
        containerClass="flex-col items-center gap-y-2 lg:flex-row"
      >
        <Menu>
          <MenuButton as="div">
            <BtnTertiary className="py-4 w-32 flex items-center justify-center">
              <div className="flex flex-col gap-y-1">
                <span>{format(daysOfWeek[selectedDayIndex], "eeee")}</span>
                <SVG
                  src="/decorations/arrow.svg"
                  className="transform rotate-90 h-5"
                />
              </div>
            </BtnTertiary>
          </MenuButton>

          <MenuList>
            {daysOfWeek.map((day, index) => (
              <MenuItem
                onSelect={() => setSelectedDayIndex(index)}
                key={day.getTime()}
              >
                <span
                  className={classNames(
                    daysOfWeek[0].getTime() === day.getTime()
                      ? "font-semibold text-beige"
                      : null
                  )}
                >
                  {format(day, "eeee")}
                </span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <DailyRow dayOfWeek={daysOfWeek[selectedDayIndex]} />
      </Lines>
    </section>
  );
}

export default DailyInfo;
