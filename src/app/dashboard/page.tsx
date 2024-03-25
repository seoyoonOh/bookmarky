import styles from '../ui/dashboard/dashboard.module.css';

const tags = [
  {
    index: 1,
    name: 'UI',
    color: 'red',
  },
  {
    index: 2,
    name: 'Design',
    color: 'orange',
  },
  {
    index: 3,
    name: 'Frontend',
    color: 'yellow',
  },
  {
    index: 4,
    name: 'DB',
    color: 'green',
  },
  {
    index: 5,
    name: 'Backend',
    color: 'mint',
  },
  {
    index: 6,
    name: 'Github',
    color: 'purple',
  },
];

const posts = [
  {
    img: '',
    title: 'Cat',
    tags: [1],
  },
  {
    img: 'https://images.pexels.com/photos/17530849/pexels-photo-17530849.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Title',
    tags: [1, 2],
  },
  {
    img: 'https://images.pexels.com/photos/172420/pexels-photo-172420.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Example',
    tags: [4],
  },
  {
    img: '',
    title: 'Hello',
    tags: [3],
  },
  {
    img: 'https://images.pexels.com/photos/17530849/pexels-photo-17530849.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Lazy Cat',
    tags: [1, 2],
  },
  {
    img: 'https://images.pexels.com/photos/172420/pexels-photo-172420.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Example',
    tags: [3],
  },
  {
    img: '',
    title: 'Cat',
    tags: [1],
  },
  {
    img: 'https://images.pexels.com/photos/17530849/pexels-photo-17530849.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Title',
    tags: [1, 2],
  },
];

export default function Dashboard() {
  const getTagColor = (index: number): string => {
    return tags.filter((tag) => tag.index === index)[0].color;
  };

  const getTagName = (index: number): string => {
    return tags.filter((tag) => tag.index === index)[0].name;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.tags}>
          {tags.map(({ index, name, color }) => (
            <li className={styles.tag} style={{ '--color': `var(--tag-${color})` }} key={index}>
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
        {posts.map(({ img, title, tags }) => (
          <div className={styles.post}>
            <div className={styles.preview}>
              <img src={img || 'https://images.pexels.com/photos/2574173/pexels-photo-2574173.jpeg?auto=compress&cs=tinysrgb&w=400'} />
            </div>
            <h1>{title}</h1>
            <div className={styles.post_tags}>
              {tags.map((idx) => (
                <div className={styles.post_tag} style={{ '--color': `var(--tag-${getTagColor(idx)})` }}>
                  {getTagName(idx)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
