import mongoose from 'mongoose'

export default async function connectToDatabase () {
    const {MONGO_URL} = process.env
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