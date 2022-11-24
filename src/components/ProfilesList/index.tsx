import { useEffect, useState } from 'react'
import instance from '../../axios'
import { ProfileType } from '../../types'

import styles from './ProfileList.module.scss'

type ProfileListProps = {
  setProfileId: (id: string) => void
}

export const ProfileList: React.FC<ProfileListProps> = ({ setProfileId }) => {
  const [profiles, setProfiles] = useState<ProfileType[]>([])
  const [name, setName] = useState<string>('')

  const fetchProfiles = async () => {
    const { data } = await instance.get('/profiles')
    setProfiles(data)
  }

  const addProfileHandler = async () => {
    const profile = {
      name,
    }

    await instance.post('/profiles', profile)
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <div className={styles.wrapper}>
      <b>Выберите профиль</b>
      <hr />
      {profiles.map((profile) => (
        <div className={styles.profile} onClick={() => setProfileId(profile._id)} key={profile._id}>
          {profile.name}
        </div>
      ))}
      <textarea
        className={styles.textarea}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addProfileHandler}>Добавить профиль</button>
    </div>
  )
}
