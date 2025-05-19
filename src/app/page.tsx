import { Title } from '@/components/Title/Title'
import styles from './page.module.scss'

export default function Home() {
  return (
     <main className={styles.main}>
    <div>
      <Title tag={'h1'}>Главная страница</Title>
    </div>
    </main>
  )
}