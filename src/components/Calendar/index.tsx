import { useCalendar } from './hooks/useCalendar'
import { checkDateIsEqual, checkIsToday, formatDate } from '../../utils'
import { TodoType } from '../../types'

import styles from './Calendar.module.scss'

interface CalendarProps {
  locale?: string
  selectedDate: Date
  selectDate: (date: Date) => void
  firstWeekDayNumber?: number
  todos: TodoType[]
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  firstWeekDayNumber = 2,
  selectDate,
  selectedDate,
  todos,
}) => {
  const { state, functions } = useCalendar({ firstWeekDayNumber, locale, selectedDate })

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.arrowLeft} onClick={() => functions.onClickArrow('left')}>
          {'<'}
        </div>
        {state.mode === 'days' && (
          <div className={styles.mode} onClick={() => functions.setMode('months')}>
            {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div className={styles.mode} onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div className={styles.mode} onClick={() => functions.setMode('days')}>
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
                const filteredTodos = todos.filter(
                  (todo) => todo.date === formatDate(day.date, 'DD MM YYYY'),
                )

                return (
                  <>
                    <div
                      key={`${day.dayNumber}-${day.monthIndex}`}
                      onClick={() => {
                        functions.setSelectedDay(day)
                        selectDate(day.date)
                      }}
                      className={
                        isAdditionalDay
                          ? styles.additionalDay
                          : '' || isSelectedDay
                          ? styles.selected
                          : '' || isToday
                          ? styles.today
                          : '' || styles.day
                      }>
                      {day.dayNumber}
                      {filteredTodos.length !== 0 && (
                        <span className={styles.todosCount}>{filteredTodos.length}</span>
                      )}
                    </div>
                  </>
                )
              })}
            </div>
          </>
        )}
        {state.mode === 'months' && (
          <div className={styles.pickContainer}>
            {state.monthNames.map((monthName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthName.monthIndex &&
                new Date().getFullYear() === state.selectedYear
              const isSelectedMonth = monthName.monthIndex === state.selectedMonth.monthIndex

              return (
                <div
                  key={monthName.month}
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthName.monthIndex)
                    functions.setMode('days')
                  }}
                  className={
                    isCurrentMonth
                      ? styles.today
                      : '' || isSelectedMonth
                      ? styles.selected
                      : '' || styles.pick
                  }>
                  {monthName.monthShort}
                </div>
              )
            })}
          </div>
        )}
        {state.mode === 'years' && (
          <div className={styles.pickContainer}>
            <div className={styles.unchoosableYear}>{state.selectedYearInterval[0] - 1}</div>
            {state.selectedYearInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year
              const isSelectedYear = year === state.selectedYear

              return (
                <div
                  key={year}
                  onClick={() => {
                    functions.setSelectedYear(year)
                    functions.setMode('months')
                  }}
                  className={
                    isCurrentYear
                      ? styles.today
                      : '' || isSelectedYear
                      ? styles.selected
                      : '' || styles.pick
                  }>
                  {year}
                </div>
              )
            })}
            <div className={styles.unchoosableYear}>
              {state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
