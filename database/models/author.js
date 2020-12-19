import mongoose from 'mongoose'

export const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    nationality: {
        type: String,
        default: ""
    }
})