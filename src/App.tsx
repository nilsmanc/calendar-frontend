import { useState, useEffect } from 'react'

import { Calendar } from './components/Calendar'
import { formatDate } from './utils'

import styles from './App.module.scss'
import { ProfileList } from './components/ProfilesList'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import { EditTodo } from './components/EditTodo'
import instance from './axios'
import { TodoType } from './types'

function App() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [profileId, setProfileId] = useState('')
  const [editId, setEditId] = useState<string>('')

  const fetchProfileTodos = async () => {
    const { data } = await instance.get(`/todos/profile/${profileId}`)
    setTodos(data)
  }

  useEffect(() => {
    fetchProfileTodos()
  }, [profileId])

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileList}>
        <ProfileList setProfileId={setProfileId} />
      </div>
      <div className={styles.calendar}>
        <div className={styles.date}>{formatDate(selectedDate, 'DD MM YYYY')}</div>
        <Calendar todos={todos} selectDate={setSelectedDate} selectedDate={selectedDate} />
      </div>
      <div className={styles.todoList}>
        <TodoList
          todos={todos}
          profileId={profileId}
          selectedDate={selectedDate}
          setEditId={setEditId}
        />
      </div>
      <div className={styles.addTodo}>
        {editId ? (
          <EditTodo
            profileId={profileId}
            selectedDate={selectedDate}
            editId={editId}
            setEditId={setEditId}
          />
        ) : (
          <AddTodo profileId={profileId} selectedDate={selectedDate} />
        )}
      </div>
    </div>
  )
}

export default App
