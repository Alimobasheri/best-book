import mongoose from 'mongoose'

import userSchema from '../models/user'
let User
try {
    User = mongoose.model('User')
} catch {
    User = mongoose.model('User', userSchema)
}

export default async function registerUserProfile({
    name,
    lastName,
    email,
    favoriteGenres,
    favoriteWriters,
    favoriteBooks,
    reviews,
    ratings,
    likedReviews,
    replies,
    orders
}) {
    try {
        return await new Promise((resolve, reject) => {
            User.findOne({email:email})
                .then((foundUser) => {
                    if (foundUser) {
                        console.log("User Exists")
                        throw(new Error("DUPLICATE_EMAIL: A user with this email already exists."))
                    } else {
                        const user = new User({
                            name,
                            lastName,
                            email,
                            favoriteGenres,
                            favoriteBooks,
                            favoriteWriters,
                            reviews,
                            ratings,
                            likedReviews,
                            replies,
                            orders
                        })

                        user.save()
                            .then(savedUser => {
                                resolve(savedUser)
                            }).catch(error => {
                                console.log("error in saving")
                                reject(error)
                                throw(error)
                            })
                    }
                })
                .catch(error => {
                    console.log("could not search bdatabase")
                    reject(error)
                })
        }).then(savedUser => {
            return {
                saved: true,
                user: savedUser
            }
        }).catch(error => {
            console.log("could not search db, ", error)
            throw(error)
        })
    } catch (error) {
        return {
            saved: false,
            error
        }
    }
}