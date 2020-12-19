import mongoose from 'mongoose'

import {genreSchema} from '../models/genre'

let Genre
try {
    Genre = mongoose.model("Genre")
} catch {
    Genre = mongoose.model("Genre", genreSchema)
}

export default async function addGenre({
    name,
    books
}) {
    return await new Promise(async (resolve, reject) => {
        Genre.findOne({name})
            .then(foundGenre => {
                if(foundGenre) {
                    reject({
                        saved: false,
                        error: "A genre with this name already exists."
                    })
                } else {
                    const genre = new Genre({
                        name,
                        books
                    })
                    genre.save()
                        .then(savedGenre => {
                            resolve({
                                saved: true,
                                savedGenre
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