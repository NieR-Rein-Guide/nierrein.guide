import { GAME_TIMEZONE } from "@config/constants";
import { utcToZonedTime } from "date-fns-tz/esm";
import format from "date-fns/esm/format";
import React from "react";
import SVG from "react-inlinesvg";

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

const gemToIcon = (gem: string): string => {
  switch (gem) {
    case "tanzanite":
      return "/ui/material/material321011_standard.png";
    case "topaz":
      return "/ui/material/material321010_standard.png";
    case "emerald":
      return "/ui/material/material321009_standard.png";
    case "aquamarine":
      return "/ui/material/material321008_standard.png";
    case "ruby":
      return "/ui/material/material321007_standard.png";
  }
};

const weaponToIcon = (weapon: string): string => {
  switch (weapon) {
    case "sword":
      return "/ui/material/material321001_standard.png";
    case "greatsword":
      return "/ui/material/material321002_standard.png";
    case "spear":
      return "/ui/material/material321003_standard.png";
    case "fist":
      return "/ui/material/material321004_standard.png";
    case "staff":
      return "/ui/material/material321005_standard.png";
    case "gun":
      return "/ui/material/material321006_standard.png";
  }
};

function DailyRow({ dayOfWeek }: DailyRowProps) {
  const dailyInfo = dailyTypes(dayOfWeek.getDay());
  const gems = dailyInfo.gems;
  const weaponUpgrades = dailyInfo.weaponUpgrades;

  return (
    <div className="relative">
      <div className="flex justify-center items-center h-12 px-4 bg-beige text-black absolute -top-6">
        <span className="text-2xl serif">{format(dayOfWeek, "eeee")}</span>
      </div>

      <div className="flex justify-center border border-beige-dark pt-8 pb-4 px-4">
        <div className="flex place-items-center">
          <div className="flex justify-center flex-wrap">
            {gems.map((gem, index) => (
              <div key={index}>
                <img
                  src={gemToIcon(gem)}
                  alt={`${gem} icon`}
                  title={gem}
                  className="h-20"
                  key={index}
                />
              </div>
            ))}
          </div>

          <SVG src="/decorations/squares.svg" className="text-beige h-4 mx-4" />

          <div className="flex justify-center flex-wrap">
            {weaponUpgrades.map((weaponUpgrade, index) => (
              <div key={index}>
                <img
                  src={weaponToIcon(weaponUpgrade)}
                  alt={`${weaponUpgrade} icon`}
                  title={weaponUpgrade}
                  className="h-20"
                  key={index}
                />
              </div>
            ))}
          </div>
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

  return (
    <section className="flex items-start flex-col my-24">
      <img
        className="absolute -left-12 top-0 transform -translate-y-1/2 h-auto"
        src="/ui/ability/ability100001_standard.png"
        alt="Daily"
      />
      <h2>Daily Info</h2>

      <div className="flex justify-center items-center w-full mb-12">
        <h3 className="surface serif text-3xl text-center">
          Today Daily Rewards
        </h3>
      </div>

      <div className="flex flex-col gap-y-12 w-full md:w-3/4 mx-auto">
        <DailyRow dayOfWeek={daysOfWeek[0]} />
      </div>

      <div className="flex justify-center items-center w-full my-12">
        <h3 className="surface serif text-3xl text-center">
          Next Days Rewards
        </h3>
      </div>

      <div className="flex flex-col gap-y-12 w-full md:w-3/4 mx-auto">
        {daysOfWeek.map((day) => {
          // We don't want the current day to show up in the list
          if (day.getDay() === daysOfWeek[0].getDay()) return;

          // Display the rest of the week
          return (
            <div key={day.getDay()}>
              <DailyRow dayOfWeek={day} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DailyInfo;
