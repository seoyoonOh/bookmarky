import { Tag } from './models';
import { connectToDB } from './utils';

export const fetchTags = async () => {
  try {
    connectToDB();
    const tags = await Tag.find();
    return tags;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch tags!');
  }
};
