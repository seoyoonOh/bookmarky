import styles from '../ui/dashboard/dashboard.module.css';
import { fetchLinks, fetchLinksByTag, fetchTags } from '../lib/data';
import Tags from '../ui/dashboard/tags/tags';
import Link from '../../../node_modules/next/link';
import { deleteLink } from '../lib/actions';
import LinkBottom from '../ui/dashboard/linkBottom/linkBottom';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    tagId: string;
  };
}) {
  let tagList = await fetchTags();
  let links;
  if (Object.keys(searchParams).length) {
    links = await fetchLinksByTag(searchParams.tagId);
  } else {
    links = await fetchLinks();
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tags tags={tagList} />
      </div>
      <div className={styles.grid}>
        {links.map(({ _id, url, title, image, tags }) => (
          <div className={styles.link} key={_id}>
            <form action={deleteLink} className={styles.form}>
              <input type="hidden" name="_id" value={_id} />
              <button className={styles.delete}>✕</button>
            </form>
            <Link href={url} target="_blank">
              <div className={styles.preview}>
                <img src={image || 'https://images.pexels.com/photos/2574173/pexels-photo-2574173.jpeg?auto=compress&cs=tinysrgb&w=400'} alt="" />
              </div>
            </Link>
            <Link href={url} target="_blank">
              <h1>{title}</h1>
            </Link>
            <LinkBottom linkId={_id} tagList={tagList} tagsForLink={JSON.parse(JSON.stringify(tags))} />
          </div>
        ))}
      </div>
    </div>
  );
}
