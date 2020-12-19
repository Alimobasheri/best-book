import mongoose from 'mongoose'

export const purchaseSchema = new mongoose.Schema({
    orderedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    orders: {
        type: [orderSchema],
        
    }
})