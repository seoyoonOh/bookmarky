import styles from '../ui/dashboard/dashboard.module.css';
import { fetchTags } from '../lib/data';

export default async function Dashboard() {
  const tags = await fetchTags();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.tags}>
          {tags.map(({ _id, name, color }: { _id: string; name: string; color: string }) => (
            <li className={styles.tag} style={{ '--color': `var(--tag-${color})` }} key={_id}>
              {name}
            </li>
          ))}
        </ul>
        <div>
          <button className={styles.edit}>edit</button>
          <button className={styles.add}>add</button>
        </div>
      </div>
      <div className={styles.grid}></div>
    </div>
  );
}
