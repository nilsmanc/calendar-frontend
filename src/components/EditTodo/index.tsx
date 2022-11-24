import { useState, useEffect } from 'react'
import instance from '../../axios'
import { TodoType } from '../../types'

import styles from './EditTodo.module.scss'

type AddTodoListProps = {
  profileId: string
  selectedDate: Date
  editId: string
  setEditId: (id: string) => void
}

export const EditTodo: React.FC<AddTodoListProps> = ({ editId, setEditId }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [editTodo, setEditTodo] = useState({} as TodoType)
  const [done, setDone] = useState<boolean>(false)

  const fetchTodo = async (id: string) => {
    const { data } = await instance.get(`/todos/${id}`)
    setEditTodo(data)
  }

  useEffect(() => {
    fetchTodo(editId)
    setTitle(editTodo.title)
    setDescription(editTodo.description)
  }, [editId, editTodo.title, editTodo.description])

  const updateTodoHandler = async () => {
    const todo = {
      title,
      description,
      done,
    }

    await instance.patch(`/todos/${editId}`, todo)

    setEditId('')
  }

  return (
    <div className={styles.wrapper}>
      <>
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
        <input type='checkbox' checked={editTodo.done} onClick={() => setDone(!done)} />

        <button onClick={updateTodoHandler}>Обновить заметку</button>
      </>
      <button
        onClick={() => {
          setEditId('')
        }}>
        Новая заметка
      </button>
    </div>
  )
}
