import { GAME_TIMEZONE } from "@config/constants";
import { utcToZonedTime } from "date-fns-tz";
import React from "react";
import { format } from "date-fns";
import Disclosure from "@components/Disclosure";

// used for listing all daily types
const DAYS_OF_WEEK = Array.from(Array(7).keys());

type WeaponType = "sword" | "greatsword" | "spear" | "fist" | "staff" | "gun";

type DailyInfo = {
  gems: string[];
  enhancementMaterials?: WeaponType[];
  weaponUpgrades: WeaponType[];
};

interface DailyRowProps {
  dayOfWeek: Date;
}

const dailyTypes = (dayOfWeek: number): DailyInfo => {
  switch (dayOfWeek) {
    case 0: // Sunday
      return {
        gems: ["topaz", "tanzanite"],
        weaponUpgrades: [
          "sword",
          "greatsword",
          "gun",
          "spear",
          "fist",
          "staff",
        ],
        enhancementMaterials: [
          "sword",
          "greatsword",
          "gun",
          "spear",
          "fist",
          "staff",
        ],
      };
    case 1: // Monday
      return {
        gems: ["emerald"],
        weaponUpgrades: ["sword"],
        enhancementMaterials: ["greatsword", "sword"],
      };
    case 2: // Tuesday
      return {
        gems: ["ruby"],
        weaponUpgrades: ["greatsword"],
        enhancementMaterials: ["spear", "fist"],
      };
    case 3: // Wednesday
      return {
        gems: ["aquamarine"],
        weaponUpgrades: ["gun"],
        enhancementMaterials: ["gun", "staff"],
      };
    case 4: // Thursday
      return {
        gems: ["topaz"],
        weaponUpgrades: ["spear"],
        enhancementMaterials: ["greatsword", "sword"],
      };
    case 5: // Friday
      return {
        gems: ["tanzanite"],
        weaponUpgrades: ["fist"],
        enhancementMaterials: ["spear", "fist"],
      };
    case 6: // Saturday
      return {
        gems: ["aquamarine", "emerald", "ruby"],
        weaponUpgrades: ["staff"],
        enhancementMaterials: ["gun", "staff"],
      };
  }
};

const tanzaniteIcon = "/ui/material/material321011_standard.png";
const topazIcon = "/ui/material/material321010_standard.png";
const emeraldIcon = "/ui/material/material321009_standard.png";
const aquamarineIcon = "/ui/material/material321008_standard.png";
const rubyIcon = "/ui/material/material321007_standard.png";

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

const swordIcon = "/ui/material/material321001_standard.png";
const greatswordIcon = "/ui/material/material321002_standard.png";
const spearIcon = "/ui/material/material321003_standard.png";
const fistIcon = "/ui/material/material321004_standard.png";
const staffIcon = "/ui/material/material321005_standard.png";
const gunIcon = "/ui/material/material321006_standard.png";

const weaponToIcon = (weapon: string): StaticImageData => {
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
  const { gems, weaponUpgrades, enhancementMaterials } = dailyTypes(
    dayOfWeek.getDay()
  );

  return (
    <div className="flex flex-col w-full bg-grey-dark bordered relative p-4">
      <div className="grid grid-cols-3">
        <h4 className="text-2xl text-beige mr-4">Daily Quest Rewards</h4>

        <div className="flex flex-wrap col-span-2">
          {gems.map((gem, index) => (
            <div key={index} className="relative h-20 w-20">
              <img src={gemToIcon(gem)} alt={`${gem} icon`} title={gem} />
            </div>
          ))}

          {enhancementMaterials.map((weapon, index) => (
            <div key={index} className="relative h-20 w-20">
              <img
                src={weaponToIcon(weapon)}
                alt={`${weapon} icon`}
                title={weapon}
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4 border-t border-beige" />

      <div className="grid grid-cols-3">
        <h4 className="text-2xl text-beige mr-4 w-28">Guerilla Rewards</h4>

        <div className="flex flex-wrap col-span-2">
          {weaponUpgrades.map((weaponUpgrade, index) => (
            <div key={index} className="relative h-20 w-20">
              <img
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

  return (
    <section className="flex items-start flex-col">
      <h2 className="overlap">Daily Quests & Guerillas</h2>

      <Disclosure initialHeight="400px">
        <div className="flex flex-col gap-y-4 max-w-xl mx-auto my-4 pb-8">
          {daysOfWeek.map((dayOfWeek, index) => (
            <div key={`daily-${index}`}>
              <h3 className="text-3xl">{format(dayOfWeek, "cccc")}</h3>
              <DailyRow dayOfWeek={daysOfWeek[index]} />
            </div>
          ))}
        </div>
      </Disclosure>
    </section>
  );
}

export default DailyInfo;
