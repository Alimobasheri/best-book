import mongoose from 'mongoose'

export const orderSchema = new mongoose.Schema({
    book: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})