import type { Model } from "mongose"

export type Branch = {
    id?: string
    title: string
    genre: string
    releaseYear: number
    description?: string
  }
  export type BranchModel = Model<Branch>