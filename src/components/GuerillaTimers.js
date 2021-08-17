import { formatDistanceToNow } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
const PT = 'US/Pacific'

const GUERILLAS = [
  {
    start: '07:00',
    end: '08:00',
  },
  {
    start: '13:00',
    end: '14:00',
  },
  {
    start: '20:00',
    end: '21:00',
  },
  {
    start: '22:00',
    end: '23:00',
  },
]

const TimerRow = ({ guerilla }) => {
  const startDate = new Date().setHours(guerilla.start.split(':')[0], 0, 0)
  const endDate = new Date().setHours(guerilla.end.split(':')[0], 0, 0)

  const startPT = zonedTimeToUtc(startDate, PT)
  const endPT = zonedTimeToUtc(endDate, PT)

  const currentTz = new Intl.DateTimeFormat().resolvedOptions().timeZone
  const start = utcToZonedTime(startPT, currentTz)
  const end = utcToZonedTime(endPT, currentTz)

  return (
    <div className="flex gap-4">
      <span className="w-32">{start.toLocaleTimeString()}</span>
      <span className="w-32">{end.toLocaleTimeString()}</span>
      <span>start in {formatDistanceToNow(start, { includeSeconds: true })}</span>
    </div>
  )
}

// 5h
// 7h
// 16h
// 22h

function GuerillaTimers() {
  return (
    <section className="flex items-start flex-col my-24">
      <h2 className="mb-2 text-2xl">Guerilla Timer</h2>
      {GUERILLAS.map(guerilla => <TimerRow guerilla={guerilla} /> )}
    </section>
  )
}

export default GuerillaTimers