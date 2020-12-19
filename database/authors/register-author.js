import mongoose from 'mongoose'

import {authorSchema} from '../models/author'

let Author
try {
    Author = mongoose.model("Author")
} catch {
    Author = mongoose.model("Author", authorSchema)
}

export default async function registerAuthor({
    name,
    books,
    bio,
    nationality
}) {
    return await new Promise(async (resolve, reject) => {
        Author.findOne({name})
            .then(foundAuthor => {
                if(foundAuthor) {
                    reject({
                        saved: false,
                        error: "An author with this name already exists"
                    })
                } else {
                    const author = new Author({
                        name,
                        books,
                        bio,
                        nationality
                    })
                    author.save()
                        .then(savedAuthor => {
                            resolve({
                                saved: true,
                                savedAuthor
                            })
                        })
                        .catch(error => {
                            reject({
                                saved: false,
                                error
                            })
                        })
                }
            })
            .catch(error => {
                reject({
                    saved: false,
                    error
                })
            })
    })
}