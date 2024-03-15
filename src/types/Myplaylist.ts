import { Model } from 'mongose'
import { Category } from './category.type'

export type Category = {
    id?: string
    title: string
    genre: string
    releaseYear: number
    description?: string
  }