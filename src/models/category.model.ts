import { Schema, model } from 'mongoose';
import { Category, CategoryModel } from '../types/Category.type';
import { USER_REFERENCE } from './user.model';

export const CATEGORY_REFERENCE = 'MovieList';

// Esquema para las películas
const CategorySchema = new Schema<Category, CategoryModel>({
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
  },
});

// Exporta el modelo de película
export default model<Category, CategoryModel>('Category', CategorySchema);
