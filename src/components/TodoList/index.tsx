import { useEffect, useState } from 'react'
import instance from '../../axios'
import { TodoType } from '../../types'
import { formatDate } from '../../utils'

type TodoListProps = {
  profileId: string
  selectedDate: Date
}

export const TodoList: React.FC<TodoListProps> = ({ profileId, selectedDate }) => {
  const [todos, setTodos] = useState([])

  const formattedSelectedDate = formatDate(selectedDate, 'DD MM YYYY')

  const fetchUserTodos = async () => {
    const { data } = await instance.get(`/todos/user/${profileId}`)
    setTodos(data)
  }

  const addTodoHandler = async () => {
    const todo = {
      title: '123',
      description: '123',
      date: formatDate(selectedDate, 'DD MM YYYY'),
      file: '123',
      profile: profileId,
      done: false,
    }

    console.log(todo)
    await instance.post('/todos', todo)
  }

  useEffect(() => {
    fetchUserTodos()
  }, [profileId])

  return (
    <div>
      {todos
        .filter(
          (todo: TodoType) => todo.profile._id === profileId && todo.date === formattedSelectedDate,
        )
        .map((todo: TodoType) => (
          <div>{todo.title}</div>
        ))}
      <button onClick={addTodoHandler}>Добавить заметку</button>
    </div>
  )
}
