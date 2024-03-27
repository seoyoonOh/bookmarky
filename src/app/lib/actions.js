'use server';

import { revalidatePath } from '../../../node_modules/next/cache';
import urlMetadata from '../../../node_modules/url-metadata/index';
import { Link, Tag } from './models';
import { connectToDB } from './utils';

export const addTag = async (formData) => {
  try {
    connectToDB();

    const { name, color } = Object.fromEntries(formData);
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

export const addLink = async (formData) => {
  try {
    connectToDB();

    const { url } = Object.fromEntries(formData);
    const metadata = await urlMetadata(url);
    const newLink = new Link({
      url,
      title: metadata.title,
      image: '',
    });
    await newLink.save();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create link!');
  }

  revalidatePath('/dashboard');
};
