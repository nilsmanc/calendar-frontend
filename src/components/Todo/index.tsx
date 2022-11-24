import { useEffect, useState } from 'react'
import instance from '../../axios'
import { TodoType } from '../../types'

export const Todo = () => {
  const [todo, setTodo] = useState({} as TodoType)

  const fetchTodo = async (id: string) => {
    const { data } = await instance.get(`/todos/${id}`)
    setTodo(data)
  }

  useEffect(() => {}, [])

  return <div></div>
}
