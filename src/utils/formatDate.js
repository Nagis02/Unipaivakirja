const WEEKDAYS = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']

export const formatWeekdayShort = (isoDate) => {
  const d = new Date(isoDate)
  return WEEKDAYS[d.getDay()]
}

export const formatDateShort = (isoDate) => {
  const d = new Date(isoDate)
  return `${d.getDate()}.${d.getMonth() + 1}.`
}