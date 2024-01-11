import { model, Schema } from 'mongoose'

const postSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export const Post = model('Post', postSchema)