import { createDate } from './createDate'

export const getWeekDayNames = (firstWeekDay: number = 1, locale: string = 'default') => {
  const weekDayNames: {
    day: ReturnType<typeof createDate>['day']
    dayShort: ReturnType<typeof createDate>['dayShort']
  }[] = Array.from({ length: 7 })

  const date = new Date()

  weekDayNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    })

    weekDayNames[dayNumberInWeek - 1] = { day, dayShort }
  })

  return [...weekDayNames.slice(firstWeekDay - 1), ...weekDayNames.slice(0, firstWeekDay - 1)]
}
