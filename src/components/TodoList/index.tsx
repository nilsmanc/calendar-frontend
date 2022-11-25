import axios from 'axios'

import instance from '../../axios'
import { TodoType } from '../../types'
import { formatDate } from '../../utils'

import styles from './TodoList.module.scss'

type TodoListProps = {
  profileId: string
  selectedDate: Date
  setEditId: (id: string) => void
  todos: TodoType[]
  isUpdated: boolean
  setIsUpdated: (boolean: boolean) => void
}

export const TodoList: React.FC<TodoListProps> = ({
  profileId,
  selectedDate,
  setEditId,
  todos,
  isUpdated,
  setIsUpdated,
}) => {
  const formattedSelectedDate = formatDate(selectedDate, 'DD MM YYYY')

  const download = (event: React.MouseEvent, link: string) => {
    const filename = link?.substring(51, link.length)
    event.preventDefault()
    axios({
      url: link,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const href = URL.createObjectURL(response.data)

      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    })
  }

  const deleteHandler = async (id: string) => {
    await instance.delete(`/todos/${id}`)
    setIsUpdated(!isUpdated)
  }

  return (
    <div className={styles.wrapper}>
      {todos
        .filter(
          (todo: TodoType) => todo.profile._id === profileId && todo.date === formattedSelectedDate,
        )
        .map((todo: TodoType) => (
          <div className={styles.todo}>
            <b>{todo.title}</b>
            <div>{todo.description}</div>
            {todo.done && <div>(Выполнено)</div>}
            <button className={styles.button} onClick={() => setEditId(todo._id)}>
              Редактировать
            </button>
            <button className={styles.button} onClick={() => deleteHandler(todo._id)}>
              Удалить
            </button>
            {todo.file && (
              <button className={styles.button} onClick={(e) => download(e, todo.file)}>
                Сохранить файл
              </button>
            )}
          </div>
        ))}
    </div>
  )
}
