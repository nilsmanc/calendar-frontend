import { TodoType } from '../../types'
import { formatDate } from '../../utils'

import styles from './TodoList.module.scss'

type TodoListProps = {
  profileId: string
  selectedDate: Date
  setEditId: (id: string) => void
  todos: TodoType[]
}

export const TodoList: React.FC<TodoListProps> = ({
  profileId,
  selectedDate,
  setEditId,
  todos,
}) => {
  const formattedSelectedDate = formatDate(selectedDate, 'DD MM YYYY')

  return (
    <div className={styles.wrapper}>
      {todos
        .filter(
          (todo: TodoType) => todo.profile._id === profileId && todo.date === formattedSelectedDate,
        )
        .map((todo: TodoType) => (
          <div className={styles.todo}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            {todo.done && <div>Done</div>}
            <button onClick={() => setEditId(todo._id)}>Редактировать</button>
          </div>
        ))}
    </div>
  )
}
