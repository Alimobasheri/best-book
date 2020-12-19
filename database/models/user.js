import mongoose from 'mongoose'

import { ratingSchema } from './rating'
import { reviewSchema } from './review'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    favoriteGenres: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    favoriteWriters: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    favoriteBooks:{
        type: [mongoose.Types.ObjectId],
        default: []
    },
    ratings: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    reviews: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    likedReviews: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    replies: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    purchases: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    orders: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    shoppingCart: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
})

export default userSchema