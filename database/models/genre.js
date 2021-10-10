import mongoose from 'mongoose'

export const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    books: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    iconSrc: {
        type: String,
        default: ''
    }
})