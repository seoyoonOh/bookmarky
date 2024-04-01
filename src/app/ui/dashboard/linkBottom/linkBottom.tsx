'use client';

import { updateTagsForLink } from '@/app/lib/actions';
import { useState } from 'react';
import styles from './linkBottom.module.css';

export default function LinkBottom({ linkId, tagList, tagsForLink }) {
  const [selectedTags, setSelectedTags] = useState(
    tagsForLink.map((tag) => {
      return tag._id;
    })
  );
  const [editing, setEditing] = useState(false);

  const selectTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      let newSelectedTags = [...selectedTags, tagId];
      setSelectedTags(newSelectedTags);
      updateTags(newSelectedTags);
    }
  };

  const deselectTag = (tagId: string) => {
    if (!editing) return;
    if (selectedTags.includes(tagId)) {
      let newSelectedTags = selectedTags.filter((id) => tagId !== id);
      setSelectedTags(newSelectedTags);
      updateTags(newSelectedTags);
    }
  };

  const updateTags = async (selectedTags) => {
    await updateTagsForLink({ _id: linkId, selectedTags });
  };

  return (
    <div className={`${styles.link_bottom} ${editing && styles.editing}`}>
      <div className={styles.link_tags}>
        {tagsForLink?.map((tag) => (
          <div className={styles.link_tag} style={{ '--color': `var(--tag-${tag.color})` }} onClick={() => deselectTag(tag._id)}>
            {tag.name}
          </div>
        ))}
      </div>
      <button className={styles.addTag} onClick={() => setEditing(!editing)}>
        {editing ? '-' : '+'}
      </button>
      <div className={styles.palette}>
        {editing &&
          tagList
            .filter((tag) => !selectedTags.includes(tag._id))
            .map((tag) => (
              <div className={styles.selectableTag} style={{ '--color': `var(--tag-${tag.color})` }} onClick={() => selectTag(tag._id)}>
                {tag.name}
              </div>
            ))}
      </div>
    </div>
  );
}