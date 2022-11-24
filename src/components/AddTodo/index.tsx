import { useState, useEffect } from 'react'
import instance from '../../axios'
import { TodoType } from '../../types'

import { formatDate } from '../../utils'
import styles from './AddTodo.module.scss'

type AddTodoListProps = {
  profileId: string
  selectedDate: Date
}

export const AddTodo: React.FC<AddTodoListProps> = ({ selectedDate, profileId }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const addTodoHandler = async () => {
    const todo = {
      title,
      description,
      date: formatDate(selectedDate, 'DD MM YYYY'),
      file: '123',
      profile: profileId,
      done: false,
    }

    setTitle('')
    setDescription('')

    await instance.post('/todos', todo)
  }

  return (
    <div className={styles.wrapper}>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.textarea}
        placeholder='Название'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        placeholder='Описание'
      />

      <button onClick={addTodoHandler}>Добавить заметку</button>
    </div>
  )
}
