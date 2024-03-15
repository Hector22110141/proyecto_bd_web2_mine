import { Schema, model, Document, Model } from 'mongoose';
import { Myplaylist } from '../types/myplaylist.type';
import { CATEGORY_REFENCE } from '../types/category.type';

interface MyplaylistDocument extends Myplaylist, Document {}

const MyplaylistSchema: Schema<MyplaylistDocument> = new Schema<MyplaylistDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: true
  }
});

const MyplaylistModel: Model<MyplaylistDocument> = model<MyplaylistDocument>('Myplaylist', MyplaylistSchema);

export default MyplaylistModel;
