import { useCalendar } from './hooks/useCalendar'
import { checkDateIsEqual, checkIsToday } from '../../utils'

import styles from './Calendar.module.scss'

interface CalendarProps {
  locale?: string
  selectedDate: Date
  selectDate: (date: Date) => void
  firstWeekDay?: number
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  firstWeekDay = 2,
  selectDate,
  selectedDate,
}) => {
  const { state, functions } = useCalendar({ firstWeekDay, locale, selectedDate })

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.arrowLeft} onClick={() => functions.onClickArrow('left')}>
          {'<'}
        </div>
        {state.mode === 'days' && (
          <div onClick={() => functions.setMode('months')}>
            {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div onClick={() => functions.setMode('years')}>{state.selectedYear}</div>
        )}
        {state.mode === 'years' && (
          <div onClick={() => functions.setMode('days')}>
            {state.selectedYearInterval[0]} -{' '}
            {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
          </div>
        )}
        <div className={styles.arrowRight} onClick={() => functions.onClickArrow('right')}>
          {'>'}
        </div>
      </div>
      <div className={styles.body}>
        {state.mode === 'days' && (
          <>
            <div className={styles.weekNames}>
              {state.weekDayNames.map((weekDayName) => (
                <div key={weekDayName.dayShort}>{weekDayName.dayShort}</div>
              ))}
            </div>
            <div className={styles.days}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date)
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date)
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDay(day)
                      selectDate(day.date)
                    }}
                    className={
                      isToday
                        ? styles.today
                        : '' || isSelectedDay
                        ? styles.selected
                        : '' || isAdditionalDay
                        ? styles.additionalDay
                        : '' || styles.day
                    }>
                    {day.dayNumber}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
