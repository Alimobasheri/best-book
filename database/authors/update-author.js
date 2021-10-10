import mongoose from 'mongoose'

import {authorSchema} from '../models/author'

let Author
try {
    Author = mongoose.model("Author")
} catch {
    Author = mongoose.model("Author", authorSchema)
}

import findAuthor from './find-author'

export default async function updateAuthor(_id, updatedProps) {
    return await new Promise(async (resolve, reject) => {
        findAuthor({_id})
        .then(async searchResult => {
            if(!searchResult.found) {
                reject({
                    saved: false, 
                    error: "Author does not exist."
                })
            } else {
                Object.keys(updatedProps).forEach(async key => {
                    searchResult.result[key] = updatedProps[key]
                })
                await searchResult.result.save()
                    .then(updatedAuthor => {
                        if(updatedAuthor) {
                            resolve({
                                saved: true,
                                updatedAuthor
                            })
                        } else {
                            resolve({
                                saved: false,
                                error: "Author could not be updated."
                            })
                        }
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