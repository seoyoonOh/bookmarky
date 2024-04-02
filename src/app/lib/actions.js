'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import urlMetadata from 'url-metadata/index';
import { Link, Tag } from './models';
import { connectToDB } from './utils';

export const addTag = async (formData) => {
  const { name, color } = Object.fromEntries(formData);
  if (name.length === 0) return;
  try {
    connectToDB();
    const newTag = new Tag({
      name,
      color,
    });
    await newTag.save();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create tag!');
  }

  revalidatePath('/dashboard');
};

export const updateTag = async (formData) => {
  const { _id, ...updateFields } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Tag.findByIdAndUpdate(_id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error('Faild to update tag!');
  }
};

export const deleteTag = async ({ _id }) => {
  try {
    connectToDB();
    await Tag.findByIdAndDelete(_id);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete tag!');
  }

  revalidatePath('/dashboard');
};

export const addLink = async (formData) => {
  const { url } = Object.fromEntries(formData);
  const metadata = await urlMetadata(url);

  try {
    connectToDB();
    const newLink = new Link({
      url,
      title: metadata.title,
      image: metadata['og:image'] || '',
    });
    await newLink.save();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create link!');
  }

  revalidatePath('/dashboard');
};

export const deleteLink = async (formData) => {
  const { _id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Link.findByIdAndDelete(_id);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete link!');
  }

  revalidatePath('/dashboard');
};

export const updateTagsForLink = async ({ _id, selectedTags }) => {
  let tags = selectedTags.map((tagId) => {
    return {
      _id: new mongoose.Types.ObjectId(tagId),
    };
  });
  try {
    connectToDB();
    await Link.findOneAndUpdate(
      { _id },
      {
        tags: tags,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update tags for link!');
  }

  revalidatePath('/dashboard');
};
