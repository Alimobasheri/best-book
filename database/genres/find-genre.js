import mongoose from 'mongoose'

import {genreSchema} from '../models/genre'

let Genre
try {
    Genre = mongoose.model("Genre")
} catch {
    Genre = mongoose.model("Genre", genreSchema)
}

export default async function findGenre(name) {
    return await new Promise(async (resolve, reject) => {
        if(name) {
            Genre.findOne({name})
                .then(foundGenre => {
                    if(foundGenre) {
                        resolve({
                            found: true,
                            foundGenre
                        })
                    } else {
                        reject({
                            found: false,
                            error: "A genre with this name couldn't be found."
                        })
                    }
                })
                .catch(error => {
                    reject({
                        found: false,
                        error
                    })
                })
        } else {
            Genre.find()
                .then(foundGenres => {
                    if(foundGenres) {
                        resolve({
                            found: true,
                            foundGenres
                        })
                    } else {
                        reject({
                            found: false,
                            error: "No genres were found."
                        })
                    }
                })
                .catch(error => {
                    reject({
                        found: false,
                        error
                    })
                })
        }
    })
}