import mongoose from 'mongoose'

import {bookSchema} from '../models/book'

let Book
try {
    Book = mongoose.model("Book")
} catch {
    Book = mongoose.model("Book", bookSchema)
}

export default async function registerBook({
    name,
    author,
    translator,
    price,
    coverSrc,
    genres,
    pageCount,
    publishYear
}) {
    return new Promise(async (resolve, reject) => {
        await Book.findOne({name})
            .then(foundBook => {
                if(foundBook) {
                    reject({
                        saved: false,
                        error: "Book already exists."
                    })
                } else {
                    const book = new Book({
                        name,
                        author,
                        translator,
                        price,
                        coverSrc,
                        genres,
                        pageCount,
                        publishYear
                    })

                    book.save()
                        .then(savedBook => {
                            resolve({
                                saved: true,
                                savedBook
                            })
                        })
                        .catch(error => {
                            reject({
                                saved: false,
                                error: error
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