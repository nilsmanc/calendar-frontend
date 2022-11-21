import { useState } from 'react'

import { Calendar } from './components/Calendar'

import styles from './App.module.scss'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div className={styles.wrapper}>
      <Calendar selectDate={setSelectedDate} selectedDate={selectedDate} />
    </div>
  )
}

export default App
