import styles from '../ui/dashboard/dashboard.module.css';
import { fetchLinks, fetchTags } from '../lib/data';

export default async function Dashboard() {
  const tags = await fetchTags();
  const links = await fetchLinks();

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
      <div className={styles.grid}>
        {links.map(({ _id, url, title, image, tags }) => (
          <div className={styles.link}>
            <div className={styles.preview}>
              <img src={image || 'https://images.pexels.com/photos/2574173/pexels-photo-2574173.jpeg?auto=compress&cs=tinysrgb&w=400'} alt="" />
            </div>
            <h1>{title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
