import { useState } from 'react'

import { Calendar } from './components/Calendar'
import { formatDate } from './utils'

import styles from './App.module.scss'
import { ProfileList } from './components/ProfilesList'
import { TodoList } from './components/TodoList'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [profileId, setProfileId] = useState('')

  return (
    <div className={styles.wrapper}>
      <ProfileList setProfileId={setProfileId} />
      <div className={styles.calendar}>
        <div className={styles.date}>{formatDate(selectedDate, 'DD MM YYYY')}</div>
        <Calendar selectDate={setSelectedDate} selectedDate={selectedDate} />
      </div>
      <div>
        <TodoList profileId={profileId} selectedDate={selectedDate} />
      </div>
    </div>
  )
}

export default App
