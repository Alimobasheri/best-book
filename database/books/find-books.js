import mongoose from 'mongoose'

import {bookSchema} from '../models/book'

let Book
try {
    Book = mongoose.model("Book")
} catch {
    Book = mongoose.model("Book", bookSchema)
}

export default function FindBooks(searchString, properties) {
    return new Promise(async (resolve, reject) => {
        const regex = new RegExp(searchString, i)
        const query = properties.reduce((accQuery, property) => ({
            ...accQuery,
            [property]: {$regex: regex}
        }), {})
        Book.find(query)
            .then(foundBooks => {
                resolve(foundBooks)
            })
            .catch(error =>
                reject(error)    
            )
    })
}