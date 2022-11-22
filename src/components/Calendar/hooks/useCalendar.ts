import { useMemo, useState } from 'react'

import {
  getWeekDayNames,
  getMonthNames,
  createDate,
  createMonth,
  getMonthNumberOfDays,
} from '../../../utils'

interface UseCalendarParams {
  locale?: string
  selectedDate: Date
  firstWeekDayNumber: number
}

const DAYS_IN_WEEK = 7

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10
  return [...Array(10)].map((_, index) => startYear + index)
}

export const useCalendar = ({
  firstWeekDayNumber = 2,
  locale = 'default',
  selectedDate: date,
}: UseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days')
  const [selectedDay, setSelectedDay] = useState(createDate({ date }))
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale }),
  )

  const [selectedYear, setSelectedYear] = useState(selectedDay.year)
  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearsInterval(selectedDay.year),
  )

  const monthNames = useMemo(() => getMonthNames(locale), [])
  const weekDayNames = useMemo(() => getWeekDayNames(firstWeekDayNumber, locale), [])

  const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear])

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear)

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays()

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays()

    const firstDay = days[0]
    const lastDay = days[monthNumberOfDays - 1]

    const shiftIndex = firstWeekDayNumber - 1

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex

    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays

    const result = []

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i
      result[i] = prevMonthDays[prevMonthDays.length - inverted]
    }

    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays]
    }

    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays]
    }

    return result
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear])

  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10))
    }

    if (mode === 'years' && direction === 'right') {
      return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10))
    }

    if (mode === 'months' && direction === 'left') {
      const year = selectedYear - 1
      if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))

      return setSelectedYear(selectedYear - 1)
    }

    if (mode === 'months' && direction === 'right') {
      const year = selectedYear + 1
      if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))

      return setSelectedYear(selectedYear + 1)
    }

    if (mode === 'days') {
      const monthIndex =
        direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1

      if (monthIndex === -1) {
        const year = selectedYear - 1
        setSelectedYear(year)
        if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))

        return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11), locale }))
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1
        setSelectedYear(year)
        if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))

        return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }))
      }
      setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }))
    }
  }

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }))
  }

  return {
    state: {
      mode,
      calendarDays,
      weekDayNames,
      monthNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearInterval,
    },
    functions: {
      setMode,
      setSelectedDay,
      onClickArrow,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearInterval,
    },
  }
}
