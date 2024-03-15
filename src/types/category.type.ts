import type { Model } from 'mongoose'
import { User } from './user.type'

export type Category = {
  id?: string
  title: string
  genre: string
  releaseYear: number
  description?: string
  user: User
}

export type CategoryModel = Model<Category>
