import { useState, useEffect } from 'react'

import instance from '../../axios'
import { TodoType } from '../../types'

import styles from './EditTodo.module.scss'

type AddTodoListProps = {
  profileId: string
  selectedDate: Date
  editId: string
  setEditId: (id: string) => void
  isUpdated: boolean
  setIsUpdated: (boolean: boolean) => void
}

export const EditTodo: React.FC<AddTodoListProps> = ({
  editId,
  setEditId,
  isUpdated,
  setIsUpdated,
}) => {
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
    setDone(editTodo.done)
  }, [editId, editTodo.title, editTodo.description, editTodo.done])

  const updateTodoHandler = async () => {
    const todo = {
      title,
      description,
      done,
    }

    await instance.patch(`/todos/${editId}`, todo)

    setEditId('')
    setIsUpdated(!isUpdated)
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
        <div className={styles.done}>
          Выполнено
          <input type='checkbox' checked={done} onClick={() => setDone(!done)} />
        </div>

        <button className={styles.button} onClick={updateTodoHandler}>
          Обновить заметку
        </button>
      </>
      <button
        className={styles.button}
        onClick={() => {
          setEditId('')
        }}>
        Новая заметка
      </button>
    </div>
  )
}
