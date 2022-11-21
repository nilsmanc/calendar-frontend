import { useCalendar } from './hooks/useCalendar'

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
        <div className={styles.arrowLeft}> {'<'} </div>
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
        <div className={styles.arrowRight}> {'>'} </div>
      </div>
    </div>
  )
}
