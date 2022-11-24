export type ProfileType = {
  name: string
  __v: number
  _id: string
}

export type TodoType = {
  title: string
  description: string
  date: string
  file: string
  profile: ProfileType
  done: boolean
  __v: number
  _id: string
}
