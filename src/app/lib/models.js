import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

// const userSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       default: () => new ObjectId(),
//     },
//     username: {
//       type: String,
//       required: true,
//       min: 3,
//       max: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

const tagSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new ObjectId(),
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new ObjectId(),
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    tags: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', unique: true }],
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  { timestamps: true }
);

// export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
export const Link = mongoose.models.Link || mongoose.model('Link', linkSchema);
