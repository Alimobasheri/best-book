import {useEffect} from 'react'

import * as mongoose from 'mongoose'

import DBContext from './db-context'

import userSchema from '../../database/models/user'

async function dbConnect() {
    const {MONGO_URL} = process.env
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    mongoose.connection.on("connected", () => {
        console.log('successfully connected to the database')
    })
    
    mongoose.connection.on("error", error => {
        console.log(`error in connection to database: ${error}`)
    })
}


export default function DBProvider({children}) {
    console.log('fuck')
    useEffect(async () => {
        const User = mongoose.model('User', userSchema)
        dbConnect()
    }, [])
    return (
        <DBContext.Provider value={{}}>
            {children}
        </DBContext.Provider>
    )
}