import { formatDistanceToNow } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { enUS, fr } from "date-fns/locale";

function locale() {
  const loc = { enUS, fr }[navigator.language];
  if (!loc) return enUS;
  return loc;
}

// timezone of the guerilla hours below
const PT = "US/Pacific";

const GUERILLAS = [
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

  const timeFormat = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "short",
  });

  return (
    <div className="flex gap-4">
      <span className="w-32">{timeFormat.format(startDate)}</span>
      <span className="w-32">{timeFormat.format(endDate)}</span>
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

function GuerillaTimers() {
  return (
    <section className="flex items-start flex-col my-24">
      <h2>Guerilla Timer (WIP)</h2>
      {GUERILLAS.map((guerilla) => (
        <TimerRow key={guerilla.start[0]} guerilla={guerilla} />
      ))}
    </section>
  );
}

export default GuerillaTimers;
