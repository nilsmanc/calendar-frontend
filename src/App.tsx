import { useState } from 'react'

import { Calendar } from './components/Calendar'
import { formatDate } from './utils'

import styles from './App.module.scss'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div className={styles.wrapper}>
      <div className={styles.date}>{formatDate(selectedDate, 'DD MM YYYY')}</div>
      <Calendar selectDate={setSelectedDate} selectedDate={selectedDate} />
    </div>
  )
}

export default App
