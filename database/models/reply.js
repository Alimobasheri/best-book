import { mongo } from "mongoose";
import mongoose from 'mongoose'

export const repliySchema = new mongoose.Schema({
    repliedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    repliedTo: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})