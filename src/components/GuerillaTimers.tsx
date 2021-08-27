import { GAME_TIMEZONE } from "@config/constants";
import { formatDistanceToNow } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { closestTo } from "date-fns/esm";
import { enUS, fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import Image from "next/image";
import { weaponToIcon } from "./DailyQuests";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";

function locale() {
  const loc = { enUS, fr }[navigator.language];
  if (!loc) return enUS;
  return loc;
}

interface Guerilla {
  start: number[];
  end: number[];
  startDate?: Date;
  endDate?: Date;
}

type GuerillasList = Guerilla[];

const GUERILLAS: GuerillasList = [
  {
    start: [7, 0],
    end: [8, 0],
  },
  {
    start: [13, 0],
    end: [14, 0],
  },
  {
    start: [20, 0],
    end: [21, 0],
  },
  {
    start: [22, 0],
    end: [23, 0],
  },
];

const timeFormat = new Intl.DateTimeFormat(navigator.language, {
  timeStyle: "short",
});

const guerillaTypes = (dayOfWeek: number, startHour: number): string[] => {
  switch (dayOfWeek) {
    case 1:
      return ["sword"];
    case 2:
      return ["greatsword"];
    case 3:
      return ["gun"];
    case 4:
      return ["spear"];
    case 5:
      return ["fist"];
    case 6:
      return ["staff"];
  }
  // 7 or 13
  if (startHour < 16) {
    return ["sword", "greatsword", "gun"];
  }
  return ["spear", "fist", "staff"];
};

const TimerRow = ({ guerilla }): JSX.Element => {
  const now = new Date();

  let startDate = new Date();
  startDate.setHours(guerilla.start[0], guerilla.start[1], 0, 0);
  startDate = zonedTimeToUtc(startDate, GAME_TIMEZONE);

  let endDate = new Date();
  endDate.setHours(guerilla.end[0], guerilla.end[1], 0, 0);
  endDate = zonedTimeToUtc(endDate, GAME_TIMEZONE);

  // no more "about 4 hours ago"
  if (now > endDate) {
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);
  }

  // Add these properties to the array so we can use them in the parent component
  // @todo refactor using a store
  guerilla.startDate = startDate;
  guerilla.endDate = endDate;

  return (
    <div className="flex flex-col w-full border border-beige-dark p-4">
      <div className="flex justify-center">
        {guerillaTypes(endDate.getDay(), guerilla.start[1]).map(
          (weapon, index) => (
            <div key={index} className="w-16 h-16 relative">
              <Image
                key={index}
                src={weaponToIcon(weapon)}
                alt={`${weapon} icon`}
                title={weapon}
              />
            </div>
          )
        )}
        {guerillaTypes(endDate.getDay(), guerilla.start[1]).map(
          (weapon, index) => (
            <div key={index} className="w-16 h-16 relative">
              <Image
                key={index}
                src={weaponToIcon(weapon)}
                alt={`${weapon} icon`}
                title={weapon}
              />
            </div>
          )
        )}
        {guerillaTypes(endDate.getDay(), guerilla.start[1]).map(
          (weapon, index) => (
            <div key={index} className="w-16 h-16 relative">
              <Image
                key={index}
                src={weaponToIcon(weapon)}
                alt={`${weapon} icon`}
                title={weapon}
              />
            </div>
          )
        )}
        {guerillaTypes(endDate.getDay(), guerilla.start[1]).map(
          (weapon, index) => (
            <div key={index} className="w-16 h-16 relative">
              <Image
                key={index}
                src={weaponToIcon(weapon)}
                alt={`${weapon} icon`}
                title={weapon}
              />
            </div>
          )
        )}
      </div>

      <span>
        {timeFormat.format(startDate)} to {timeFormat.format(endDate)}
      </span>

      <span>
        {formatDistanceToNow(startDate, {
          includeSeconds: true,
          addSuffix: true,
          locale: locale(),
        })}
      </span>
    </div>
  );
};

function GuerillaTimers(): JSX.Element {
  const [nextGuerilla, setNextGuerilla] = useState(null);

  useEffect(() => {
    const interval = updateNextGuerilla();

    return () => clearInterval(interval);
  });

  function updateNextGuerilla() {
    return setInterval(() => {
      if (GUERILLAS.every((guerilla) => guerilla.startDate)) {
        const now = new Date();
        const startDates = GUERILLAS.map(
          (guerilla) => guerilla.startDate
        ).filter((date) => now < date); // Filter past dates (i.e 1 minute ago)

        const nextGuerilla = closestTo(new Date(), startDates);
        setNextGuerilla(nextGuerilla);
      }
    }, 1000);
  }

  return (
    <section className="flex items-start flex-col">
      <img
        className="absolute -left-12 top-0 transform -translate-y-1/2 h-auto"
        src="/ui/ability/ability100001_standard.png"
        alt="Guerilla"
      />
      <h2>Guerilla</h2>

      <div className="flex justify-center items-center w-full">
        <h3 className="surface serif text-3xl text-center">
          Next Guerilla is{" "}
          {nextGuerilla &&
            formatDistanceToNow(nextGuerilla, {
              includeSeconds: true,
              addSuffix: true,
              locale: locale(),
            })}
        </h3>
      </div>

      <div className="w-full text-center mt-8">
        <Accordion collapsible>
          <AccordionItem>
            <AccordionButton className="btn">Expand</AccordionButton>
            <AccordionPanel className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4 w-full">
                {GUERILLAS.map((guerilla) => (
                  <TimerRow key={guerilla.start[0]} guerilla={guerilla} />
                ))}
              </div>
              <div className="grid grid-cols-1 place-items-center mt-6">
                <span className="text-center">
                  The displayed times are local (converted from the game
                  timezone)
                </span>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default GuerillaTimers;
