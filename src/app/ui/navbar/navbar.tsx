import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import styles from './navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>
          <img src="/logo.svg" alt="" />
        </div>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
