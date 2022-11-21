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
  const {} = useCalendar({ firstWeekDay, locale, selectedDate })
  return <div>Calendar</div>
}
