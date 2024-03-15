import { Schema, model } from 'mongoose'
import { Branch, BranchModel } from '../types/branch.type'

const Branches = new Schema<Branch, BranchModel>({
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
        
})

export default model('Branch', Branches)