'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from '../../../../../node_modules/next/navigation';
import styles from './tags.module.css';
import { addLink, addTag, deleteTag } from '../../../lib/actions';
import colors from '../../../assets/colors.json';
import { useEffect } from 'react';

export default function Tags({ tags }: { tags: { _id: string; name: string; color: string }[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedTag, setSelectedTag] = useState<string>('');
  const params = new URLSearchParams(searchParams);
  const [editing, setEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectingColor, setSelectingColor] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);
  const [addTagPosition, setAddTagPosition] = useState<'left' | 'right'>('left');

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
    setEditing(false);
  };

  const getPosition = (className: string) => {
    let element = document.querySelector(`[class*="${className}"]`);
    let rect = element?.getBoundingClientRect();
    if (!rect) return 'right';

    let screenWidth = window.innerWidth;
    let screenCenter = screenWidth / 2;
    return rect.left < screenCenter ? 'left' : 'right';
  };

  useEffect(() => {
    if (!editing) return;
    const calculatedPosition = getPosition('editTagsBtn');
    setAddTagPosition(calculatedPosition || 'left');
  }, [editing]);

  return (
    <>
      <div className={`${styles.tags} ${editing && styles.editing}`}>
        {editing && <div onClick={() => setEditing(false)} className={styles.overlay}></div>}
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
        <div
          className={`${styles.formContainer} ${addTagPosition === 'left' ? styles.left : styles.right}`}
          style={selectedTag.length ? { display: 'none' } : {}}
        >
          <button className={styles.editTagsBtn} onClick={() => setEditing(!editing)}>
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
                      {colors.map(({ color, index }) => (
                        <div
                          key={index}
                          className={styles.paletteColor}
                          style={{ '--color': `var(--tag-${color})` }}
                          onClick={() => setSelectedColor(color)}
                        ></div>
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
      <div className={bookmarking && styles.bookmarking}>
        <button className={styles.bookmark} onClick={() => setBookmarking(!bookmarking)}>
          🔖
        </button>
        {bookmarking && (
          <>
            <div className={styles.bookmark_overlay} onClick={() => setBookmarking(false)}></div>
            <form action={addLink} className={styles.bookmarkForm} onSubmit={() => setBookmarking(false)}>
              <input type="text" name="url" placeholder="url" />
              <button>🔖</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
