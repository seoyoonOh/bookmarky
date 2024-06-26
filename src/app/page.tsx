import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import styles from './home.module.css';

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect('/dashboard');
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.paragraph}>
          <h2>북마크 저장만 하지 말고 </h2>
          <h1>bookmarky!</h1>
          <Link href="/dashboard">
            <button className={styles.button}>시작하기</button>
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.image}>
          <img src="/example.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
