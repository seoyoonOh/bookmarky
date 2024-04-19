import styles from '../ui/dashboard/dashboard.module.css';
import { fetchLinks, fetchLinksByTag, fetchTags } from '../lib/data';
import Tags from '../ui/dashboard/tags/tags';
import Link from '../../../node_modules/next/link';
import { deleteLink } from '../lib/actions';
import LinkBottom from '../ui/dashboard/linkBottom/linkBottom';
import { auth } from '@clerk/nextjs';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    tagId: string;
  };
}) {
  let { userId } = auth();
  let tagList = await fetchTags({ userId });
  let links;
  if (Object.keys(searchParams).length) {
    links = await fetchLinksByTag({ userId, tagId: searchParams.tagId });
  } else {
    links = await fetchLinks({ userId });
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tags tags={tagList} />
      </div>
      <div className={styles.grid}>
        {tagList.length === 0 && <div className={styles.inst_tag}>태그를 추가하세요!</div>}
        {links.length === 0 && <div className={styles.inst_bookmark}>북마크를 추가하세요!</div>}
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
