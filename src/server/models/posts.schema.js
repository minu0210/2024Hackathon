import { model, Schema } from 'mongoose';

const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
};

const postSchema = new Schema({
    category: {
        type: String,
        required: false
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
    createdAt: {
        type: String,
        default: formatDate,
        required: true,
    },
    updatedAt: {
        type: String,
        default: formatDate,
        required: true,
    }
});

// Pre hook to format createdAt and updatedAt before saving
postSchema.pre('save', function (next) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.createdAt = `${year}년 ${month}월 ${day}일`;
    this.updatedAt = `${year}년 ${month}월 ${day}일`;
    next();
});

export default model('Post', postSchema);
