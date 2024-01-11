import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isTeacher: {
        type: Boolean,
        required: true
    }
})

export default model('User', userSchema)