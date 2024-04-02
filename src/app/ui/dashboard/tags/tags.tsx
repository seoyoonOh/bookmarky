'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from '../../../../../node_modules/next/navigation';
import styles from './tags.module.css';
import { addTag, deleteTag } from '@/app/lib/actions';
import colors from '@/app/assets/colors.json';

export default function Tags({ tags }: { tags: { _id: string; name: string; color: string }[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedTag, setSelectedTag] = useState<string>('');
  const params = new URLSearchParams(searchParams);
  const [editing, setEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectingColor, setSelectingColor] = useState(false);

  const handleTagSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    if (editing) return;
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

  if (selectedTag === '' && params.size) {
    params.delete('tagId');
    replace(`${pathname}`);
  }

  const handleDelete = async (tagId: string) => {
    await deleteTag({ _id: tagId });
  };

  return (
    <div className={`${styles.tags} ${editing && styles.editing}`}>
      <div onClick={() => setEditing(false)} className={styles.overlay}></div>
      {tags.map(({ _id, name, color }: { _id: string; name: string; color: string }) => (
        <div
          className={`${styles.tag} ${selectedTag === '' ? '' : selectedTag !== _id ? styles.not_selected : ''}`}
          style={{ '--color': `var(--tag-${color})` }}
          key={_id}
          data-key={_id}
          onClick={handleTagSelect}
        >
          {name}
          {editing && (
            <div className={styles.delete} onClick={() => handleDelete(_id)}>
              ✕
            </div>
          )}
        </div>
      ))}
      <div className={styles.formContainer}>
        <button className={styles.edit} onClick={() => setEditing(!editing)}>
          {editing ? '-' : '+'}
        </button>
        {editing && (
          <form action={addTag} className={styles.form} onSubmit={() => setEditing(false)}>
            <input type="hidden" name="color" value={selectedColor} />
            <div className={styles.color} style={{ '--color': `var(--tag-${selectedColor})` }} onClick={() => setSelectingColor(!selectingColor)}>
              {selectingColor && (
                <>
                  <div onClick={() => setSelectingColor(false)} className={styles.palette_overlay}></div>
                  <div className={styles.palette}>
                    {colors.map(({ color }) => (
                      <div className={styles.paletteColor} style={{ '--color': `var(--tag-${color})` }} onClick={() => setSelectedColor(color)}></div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <input className={styles.name} type="text" placeholder="이름" name="name" />
            <button className={styles.add}>+</button>
          </form>
        )}
      </div>
    </div>
  );
}
