import { resolveHref } from 'next/dist/next-server/lib/router/router'
import {connect, findAuthor, registerAuthor} from '../../database'

export async function authors(req, res) {
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

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

export default allowCors(authors)