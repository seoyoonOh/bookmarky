import mongoose from 'mongoose';
import { Link, Tag } from './models';
import { connectToDB } from './utils';

export const fetchTags = async ({ userId }) => {
  try {
    connectToDB();
    const tags = await Tag.find({ user: userId });
    return tags;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch tags!');
  }
};

export const fetchLinks = async ({ userId }) => {
  try {
    connectToDB();
    const links = await Link.find({ user: userId }).populate('tags');
    return links;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch links!');
  }
};

export const fetchLinksByTag = async ({ userId, tagId }) => {
  try {
    connectToDB();
    const links = await Link.find({ user: userId, tags: new mongoose.Types.ObjectId(tagId) }).populate('tags');
    return links;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch links by tag!');
  }
};
