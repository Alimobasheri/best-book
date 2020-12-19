import { resolveHref } from 'next/dist/next-server/lib/router/router'
import {connect, findAuthor, registerAuthor} from '../../database'

export default async function authors(req, res) {
    if(req.method === "GET"){
        const {
            name
        } = req.query
        const connected = await connect()
        if(connected.status) {
            await findAuthor(name)
                .then(response => {
                    if(response.found) {
                        return res.status(200)
                            .json({
                                authors: Array.isArray(response.result) ?
                                    response.result :
                                    [response.result]
                            })
                    } else {
                        return res.status(400)
                            .json({
                                error: 'No Author was found.'
                            })
                    }
                })
                .catch(response => {
                    res.status(500)
                        .json({error: response.error})
                })
        } else {
            return res.status(500)
                .json({
                    error: "Internal server error."
                })
        }
    } else if(req.method === "POST") {
        const {
            name,
            books,
            bio,
            nationality
        } = req.body
        if(!name) {
            return res.status(400)
                .json({
                    error: "All required fields must be sent.",
                    sentBody: req.body
                })
        }
        const connected = await connect()
        if(connected.status) {
            await registerAuthor({
                name,
                books,
                bio,
                nationality
            })
            .then(response => {
                if(response.saved) {
                    return res.status(200).json({savedAuthor: response.savedAuthor})
                } else {
                    return res.status(402).json({error: response.error})
                }
            })
            .catch(response => {
                if(!response.saved) {
                    return res.status(402).json({error: response.error})
                }
                res.status(500).json({response})
            })
        } else {
            return res.status(500).json({error: "Internal server error."})
        }
    }
}