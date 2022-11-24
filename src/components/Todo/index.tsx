import { useEffect, useState } from 'react'
import instance from '../../axios'

export const Todo = () => {
  const [todo, setTodo] = useState({})

  const fetchTodo = async (id: string) => {
    const { data } = await instance.get(`/todo/${id}`)
    setTodo(data)
  }

  useEffect(() => {}, [])

  return <div></div>
}
