import mongoose from 'mongoose'

import {authorSchema} from '../models/author'

let Author
try {
    Author = mongoose.model("Author")
} catch {
    Author = mongoose.model("Author", authorSchema)
}

export default async function findAuthor(query) {
    return await new Promise(async (resolve, reject) => {
        const search = query ?
            async () => await Author.findOne(query) :
            async () => await Author.find()
        await search().then(foundAuthors => {
            if(foundAuthors) {
                resolve({
                    found: true,
                    result: foundAuthors
                })
            } else {
                resolve({
                    found: false,
                    error: "No author was found."
                })
            }
        })
        .catch(error => {
            reject({
                error
            })
        })
    })
}