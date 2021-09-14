const GAUGE_LEVELS = {
  1260: 'C',
  1440: 'B',
  1500: 'A',
}

export default function getGaugeLevel(cooltime: number) {
  const gaugeLevel = Object.keys(GAUGE_LEVELS).find(level => {
    return Number(level) >= cooltime
  })

  return GAUGE_LEVELS[gaugeLevel]
}