import { useState } from 'react'

import { Calendar } from './components/Calendar'
import { formateDate } from './utils'

import styles from './App.module.scss'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div className={styles.wrapper}>
      <div className={styles.date}>{formateDate(selectedDate, 'DD MM YYYY')}</div>
      <Calendar selectDate={setSelectedDate} selectedDate={selectedDate} />
    </div>
  )
}

export default App
