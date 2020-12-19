import mongoose from 'mongoose'

import userSchema from '../models/user'
let User
try {
    User = mongoose.model('User')
} catch {
    User = mongoose.model('User', userSchema)
}

export default async function findUserByEmail (email) {
    return await new Promise((resolve, reject) => {
        User.findOne({email})
            .then(foundUser => {
                if(foundUser)
                    resolve(foundUser)
                else
                    reject("User Not Found.")
            })
            .catch(error => 
                reject(error)    
            )
    })
    .then(foundUser => {
        return {
            found: true,
            user: foundUser
        }
    })
    .catch(error => {
        return {
            error
        }
    })
}