import {connect, findAuthor, registerAuthor, updateAuthor} from '../../database'

export default async function authors(req, res) {
    if(req.method === "GET"){
        const connected = await connect()
        if(connected.status) {
            let queryKeys = Object.keys(req.query)
            await findAuthor(queryKeys.length > 0 ? req.query : undefined)
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
    } else if(req.method === "PUT") {
        const {
            id,
            updateCollection
        } = req.body
        if(!id) {
            return res.status(400).json({
                error: "No author id was provided.",
                sentBody: req.body
            })
        } if(!updateCollection) {
            return res.status(400).json({
                error: "No updateCollection was provided. Please send an object mapping Author props to be updated.",
                sentBody: req.body
            })
        }
        
        const connected = await connect()
        if(connected.status) {
            await updateAuthor(id, updateCollection)
                .then(result => {
                    if(result.saved) {
                        return res.status(200).json({
                            updated: true,
                            updatedAuthor: result.updatedAuthor
                        })
                    } else {
                        return res.status(500).json({
                            updated: false,
                            error: 'Author could not be updated.'
                        })
                    }
                })
                .catch(message => {
                    return res.status(500).json({
                        updated: false,
                        error: message.error
                    })
                })
        } else {
            return res.status(500).json({error: '500: Internal Server Error.'})
        }
    }
}