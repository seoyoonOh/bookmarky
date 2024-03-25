import styles from './navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="" />
      </div>
    </div>
  );
};
