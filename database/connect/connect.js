import mongoose from 'mongoose'

import { MONGO_URL } from '../../db-keys'

export default async function connectToDatabase () {
    let status = await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(_ => {
        return {
            status: true
        }
    }).catch(error => {
        return {
            status: false,
            statusCode: 500,
            error: error
        }
    })
    return status
}