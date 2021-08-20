import { zonedTimeToUtc } from "date-fns-tz";
import React from "react";
import SVG from 'react-inlinesvg'

// used for listing all daily types
const DAYS_OF_WEEK = Array.from(Array(7).keys())

type DailyInfo = {
    gems: string[]
    weaponUpgrades: string[]
}

const dailyTypes = (dayOfWeek: number): DailyInfo => {
    switch(dayOfWeek) {
        case 0: return {
            gems: ["topaz", "tanzanite"],
            weaponUpgrades: ["greatsword", "sword"]
        }
        case 1: return {
            gems: ["emerald"],
            weaponUpgrades: ["greatsword", "sword"]
        }
        case 2: return {
            gems: ["ruby"],
            weaponUpgrades: ["greatsword", "sword"]
        }
        case 3: return {
            gems: ["aquamarine"],
            weaponUpgrades: ["greatsword", "sword"]
        }
        case 4: return {
            gems: ["topaz"],
            weaponUpgrades: ["greatsword", "sword"]
        }
        case 5: return {
            gems: ["tanzanite"],
            weaponUpgrades: ["spear", "fist"]
        }
        case 6: return {
            gems: ["aquamarine", "emerald", "ruby"],
            weaponUpgrades: ["greatsword", "sword"]
        }
    }
}

const gemToIcon = (gem: string): string => {
    switch(gem) {
        case "tanzanite": return "/ui/material/material321011_standard.png"
        case "topaz": return "/ui/material/material321010_standard.png"
        case "emerald": return "/ui/material/material321009_standard.png"
        case "aquamarine": return "/ui/material/material321008_standard.png"
        case "ruby": return "/ui/material/material321007_standard.png"
    }
}

const weaponToIcon = (weapon: string): string => {
    switch (weapon) {
      case "sword": return "/ui/material/material321001_standard.png"
      case "greatsword": return "/ui/material/material321002_standard.png"
      case "spear": return "/ui/material/material321003_standard.png"
      case "fist": return "/ui/material/material321004_standard.png"
      case "staff": return "/ui/material/material321005_standard.png"
      case "gun": return "/ui/material/material321006_standard.png"
    }
  }

const DailyRow = ({ dayOfWeek }) => {

    const dailyInfo = dailyTypes(dayOfWeek)
    const gems = dailyInfo.gems
    const weaponUpgrades = dailyInfo.weaponUpgrades

    console.log(gems.length)

    return (
        <span className="border border-beige-dark p-4 flex">
            <span className="flex place-items-center">
                <span className={`grid grid-cols-${gems.length} place-items-center`}>{gems.map((gem, index)=>(
                    <div key={index}>
                        <img
                        src={gemToIcon(gem)}
                        alt={`${gem} icon`}
                        title={gem}
                        className="h-16" 
                        key={index} 
                        />
                    </div>
                ))}
                </span>

                <SVG src="/decorations/squares.svg" className="text-beige h-4 mx-4" />
                
                <span className={`grid grid-cols-${weaponUpgrades.length} place-items-center`}>{weaponUpgrades.map((weaponUpgrade, index)=>(
                    <div key={index}>
                        <img
                        src={weaponToIcon(weaponUpgrade)}
                        alt={`${weaponUpgrade} icon`}
                        title={weaponUpgrade}
                        className="h-16" 
                        key={index} 
                        />
                    </div>
                ))}</span>
            </span>

        </span>
      );
}

function DailyInfo(): JSX.Element {

    // TODO: adapt to game timezone
    const now = new Date();
    
    const day = 60 * 60 * 24 * 1000;
    const tomorrow = new Date(now.getTime() + day)

    return (
        <section className="flex items-start flex-col my-24">
            <img className="absolute -left-12 top-0 transform -translate-y-1/2 h-auto" src="/ui/ability/ability100001_standard.png" alt="Daily" />
            <h2>Daily Info</h2>

            <div className="flex justify-center items-center w-full mb-6">
                <h3 className="surface serif text-3xl text-center">
                Today Daily Rewards
                </h3>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-y-4 w-full">
                <DailyRow dayOfWeek = {now.getDay()}/>
            </div>

            <div className="flex justify-center items-center w-full mb-6 mt-6">
                <h3 className="surface serif text-3xl text-center">
                Tomorrow Daily Rewards
                </h3>
            </div>

            <div className="grid grid-cols-1 place-items-center gap-y-4 w-full">
                <DailyRow dayOfWeek = {tomorrow.getDay()}/>
            </div>

        </section>
    )
}

export default DailyInfo