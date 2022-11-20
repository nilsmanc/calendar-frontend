import styles from './App.module.scss'
import { createDate } from './utils/createDate'
import { createMonth } from './utils/createMonth'
import { createYear } from './utils/createYear'

console.log('createDate', createDate({ locale: 'en-US' }))
console.log('createMonth', createMonth({ locale: 'en-US' }).createMonthDays())
console.log('createYear', createYear({ locale: 'en-US' }).createYearMonths())

function App() {
  return <div className={styles.wrapper}>Calendar</div>
}

export default App
