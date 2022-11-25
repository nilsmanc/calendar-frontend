import { useState } from 'react'

import instance from '../../axios'
import { formatDate } from '../../utils'

import styles from './AddTodo.module.scss'

type AddTodoListProps = {
  profileId: string
  selectedDate: Date
  fileUrl: string
  setFileUrl: (url: string) => void
  isUpdated: boolean
  setIsUpdated: (boolean: boolean) => void
}

export const AddTodo: React.FC<AddTodoListProps> = ({
  selectedDate,
  profileId,
  fileUrl,
  setFileUrl,
  isUpdated,
  setIsUpdated,
}) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData()
      const file = event.target.files![0]
      formData.append('file', file)
      const { data } = await instance.post('/upload', formData)
      setFileUrl('http://localhost:4444' + data.url)
    } catch (err) {
      console.warn(err)
      alert('Failed to upload file')
    }
  }

  const addTodoHandler = async () => {
    const todo = {
      title,
      description,
      date: formatDate(selectedDate, 'DD MM YYYY'),
      file: fileUrl,
      profile: profileId,
      done: false,
    }

    await instance.post('/todos', todo)
    setTitle('')
    setDescription('')
    setIsUpdated(!isUpdated)
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
      <input type='file' onChange={handleChangeFile} />
      <button className={styles.button} disabled={!profileId} onClick={addTodoHandler}>
        Добавить заметку
      </button>
    </div>
  )
}
