import { useMemo, useState } from 'react'

import { getWeekDayNames, getMonthNames, createDate, createMonth } from '../../../utils'

interface UseCalendarParams {
  locale?: string
  selectedDate: Date
  firstWeekDay: number
}

export const useCalendar = ({
  firstWeekDay = 2,
  locale = 'default',
  selectedDate: date,
}: UseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days')
  const [selectedDate, setSelectedDate] = useState(createDate({ date }))
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale }),
  )

  const [selectedYear, setSelectedYear] = useState(selectedDate.year)

  const monthNames = useMemo(() => getMonthNames(locale), [])
  const weekDayNames = useMemo(() => getWeekDayNames(firstWeekDay, locale), [])

  console.log('weekDayNames', weekDayNames)

  return {}
}
