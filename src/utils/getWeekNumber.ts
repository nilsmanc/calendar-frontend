export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysYear = (date.getTime() - firstDayOfTheYear.getTime()) / 86400000

  return Math.ceil((pastDaysYear + firstDayOfTheYear.getDay() + 1) / 7)
}
