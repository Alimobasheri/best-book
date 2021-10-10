import mongoose from 'mongoose'

export const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    translator: {
        type: mongoose.Types.ObjectId,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    coverSrc: {
        type: String,
        default: "no-cover"
    },
    genres: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    pageCount: {
        type: Number,
        required: true
    },
    publishYear: {
        type: Date,
        default: new Date().getFullYear
    },
    ratings: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    ratesCount: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [mongoose.Types.ObjectId]
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    purchaseCount: {
        type: Number,
        default: 0
    }
})