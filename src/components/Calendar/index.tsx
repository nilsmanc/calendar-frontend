import { useCalendar } from './hooks/useCalendar'

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
  const { state } = useCalendar({ firstWeekDay, locale, selectedDate })
  console.log('state', state)
  return <div>Calendar</div>
}
