'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from '../../../../../node_modules/next/navigation';
import styles from './tags.module.css';

export default function Tags({ tags }: { tags: { _id: string; name: string; color: string }[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedTag, setSelectedTag] = useState<string>('');
  const handleTagSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    const params = new URLSearchParams(searchParams);
    const target = event.target as HTMLLIElement;
    let tagId = target.getAttribute('data-key') || '';
    if (selectedTag === tagId) {
      tagId = '';
      params.delete('tagId');
      setSelectedTag('');
    } else {
      params.set('tagId', tagId);
      setSelectedTag(tagId);
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <ul className={styles.tags}>
      {tags.map(({ _id, name, color }: { _id: string; name: string; color: string }) => (
        <li
          className={`${styles.tag} ${selectedTag === '' ? '' : selectedTag !== _id ? styles.not_selected : ''}`}
          style={{ '--color': `var(--tag-${color})` }}
          key={_id}
          data-key={_id}
          onClick={handleTagSelect}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
