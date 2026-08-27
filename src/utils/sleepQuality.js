export const QUALITY_LEVELS = [
  { key: 'huono', label: 'Huono', color: '#4d397c' },
  { key: 'kohtalainen', label: 'Kohtalainen', color: '#6f59a6' },
  { key: 'hyva', label: 'Hyvä', color: '#9881d9' },
  { key: 'erinomainen', label: 'Erinomainen', color: '#c2b1f8' },
]

export const qualityByKey = (key) => QUALITY_LEVELS.find((q) => q.key === key)

export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}