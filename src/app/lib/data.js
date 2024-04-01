import mongoose from 'mongoose';
import { Link, Tag } from './models';
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

export const fetchLinks = async () => {
  try {
    connectToDB();
    const links = await Link.find().populate('tags');
    return links;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch links!');
  }
};

export const fetchLinksByTag = async (tagId) => {
  try {
    connectToDB();
    const links = await Link.find({ tags: new mongoose.Types.ObjectId(tagId) }).populate('tags');
    return links;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch links by tag!');
  }
};
