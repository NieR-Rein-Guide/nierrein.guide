import { formatDistanceToNow } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { closestTo } from "date-fns/esm";
import { enUS, fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import SVG from 'react-inlinesvg'

function locale() {
  const loc = { enUS, fr }[navigator.language];
  if (!loc) return enUS;
  return loc;
}

// timezone of the guerilla hours below
const PT = "US/Pacific";

interface Guerilla {
  start: number[]
  end: number[]
  startDate?: Date
  endDate?: Date
}

type GuerillasList = Guerilla[]

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

const TimerRow = ({ guerilla }) => {
  const now = new Date();

  let startDate = new Date();
  startDate.setHours(guerilla.start[0], guerilla.start[1], 0, 0);
  startDate = zonedTimeToUtc(startDate, PT);

  let endDate = new Date();
  endDate.setHours(guerilla.end[0], guerilla.end[1], 0, 0);
  endDate = zonedTimeToUtc(endDate, PT);

  // no more "about 4 hours ago"
  if (now > endDate) {
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);
  }

  // Add these properties to the array so we can use them in the parent component
  // @todo refactor using a store
  guerilla.startDate = startDate
  guerilla.endDate = endDate

  return (
    <div className="grid grid-cols-3 place-items-center border border-beige-dark p-4">
      <span className="md:w-48 text-right">
        {timeFormat.format(startDate)} to {timeFormat.format(endDate)}
      </span>

      <SVG src="/decorations/squares.svg" className="text-beige h-4 mx-4" />

      <span className="md:w-48 text-left">
        {formatDistanceToNow(startDate, {
          includeSeconds: true,
          addSuffix: true,
          locale: locale(),
        })}
      </span>
    </div>
  );
};

function GuerillaTimers() {
  const [nextGuerilla, setNextGuerilla] = useState(null)

  useEffect(() => {
    const interval = updateNextGuerilla()

    return () => clearInterval(interval)
  })

  function updateNextGuerilla() {
    return setInterval(() => {
      if (GUERILLAS.every((guerilla) => guerilla.startDate)) {
        const now = new Date()
        const startDates = GUERILLAS
          .map(guerilla => guerilla.startDate)
          .filter(date => now < date) // Filter past dates (i.e 1 minute ago)

        const nextGuerilla = closestTo(new Date(), startDates)
        setNextGuerilla(nextGuerilla)
      }
    }, 1000)
  }

  return (
    <section className="flex items-start flex-col my-24">
      <img className="absolute -left-12 top-0 transform -translate-y-1/2 h-auto" src="/ui/ability/ability100001_standard.png" alt="Guerilla" />
      <h2>Guerilla Timer</h2>

      <div className="flex justify-center items-center w-full mb-6">
        <h3 className="surface serif text-3xl text-center">
          Next Guerilla is{' '}
          {nextGuerilla && formatDistanceToNow(nextGuerilla, {
            includeSeconds: true,
            addSuffix: true,
            locale: locale(),
          })}
        </h3>
      </div>

      <div className="grid grid-cols-1 place-items-center gap-y-4 w-full">
        {GUERILLAS.map((guerilla) => (
          <TimerRow key={guerilla.start[0]} guerilla={guerilla} />
        ))}
        <div className="grid grid-cols-3 place-items-center">
          <span className="w-48 text-center">
            Local time
          </span>
        </div>
      </div>
    </section>
  );
}

export default GuerillaTimers;
