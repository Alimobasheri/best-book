import mongoose from 'mongoose'

export const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    book: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    replies: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    repliesCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    likesCount: {
        type: Number,
        default: 0
    }
})