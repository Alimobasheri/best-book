import mongoose from 'mongoose'

export const ratingSchema = new mongoose.Schema({
    rater: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    ratingScore: {
        type: Number,
        required: true
    }
})