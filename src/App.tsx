import styles from './App.module.scss'
import { createDate } from './utils/createDate'

console.log('createDate', createDate({ locale: 'en-US' }))

function App() {
  return <div className={styles.wrapper}>Calendar</div>
}

export default App
