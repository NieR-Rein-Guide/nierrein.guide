import { formatDistanceToNow } from "date-fns";
import { closestTo } from "date-fns/esm";
import { useEffect, useState } from "react";

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

/* const timeFormat = new Intl.DateTimeFormat(navigator.language, {
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
}; */

/* const TimerRow = ({ guerilla }): JSX.Element => {
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
      </div>

      <span>
        {timeFormat.format(startDate)} to {timeFormat.format(endDate)}
      </span>

      <span>
        {formatDistanceToNow(startDate, {
          includeSeconds: true,
          addSuffix: true,
        })}
      </span>
    </div>
  );
}; */

const EVERY_MINUTE = 60 * 1000;

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
    }, EVERY_MINUTE);
  }

  return (
    <span>
      {(nextGuerilla &&
        formatDistanceToNow(nextGuerilla, {
          includeSeconds: true,
          addSuffix: true,
        })) ||
        "calculating..."}
    </span>
  );
}

export default GuerillaTimers;
