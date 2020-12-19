import {connect, findBooks, registerBook, findAuthor, registerAuthor} from '../../database'

export default async function books(req, res) {
    if(req.method === "POST") {
        const {
            name,
            author,
            translator,
            price,
            coverSrc,
            genres,
            pageCount,
            publishYear
        } = req.body
        const connected = await connect()
        if(connected.status) {
            if(!name || !author || !pageCount) {
                return res.status(400)
                    .json({
                        error: "All required fields must be sent.",
                        sentBody: req.body
                    })
            }
            let authorObjectId
            if(typeof author === "string") {
                authorObjectId = await findAuthor(author)
                    .then(async result => { 
                        if(result.error) {
                            return await registerAuthor({name: author})
                                .then(response => {
                                    if(response.saved) {
                                        return response.savedAuthor._id
                                    } else {
                                        throw(response.error)
                                    }
                                })
                                .catch(error => {
                                    throw(error)
                                })
                        } else {
                            return result.result._id
                        }
                    })
                    .then(authorId => authorId)
                    .catch(error => {
                        console.log(error)
                        return {error: error}
                    })
                    if(authorObjectId.error) return res.status(500).json({error: authorObjectId.error})
            } else {
                authorObjectId = author
            }
            let translatorObjectId
            if(!translator) {
                translatorObjectId = false
            } else if (typeof translator === "string") {
                translatorObjectId = await findAuthor(translator)
                    .then(async result => { 
                        if(result.error) {
                            return await registerAuthor({name: translator})
                                .then(response => {
                                    if(response.saved) {
                                        return response.savedAuthor._id
                                    } else {
                                        throw(response.error)
                                    }
                                })
                                .catch(error => {
                                    throw(error)
                                })
                        } else {
                            return result._id
                        }
                    })
                    .catch(error => {
                        cosnsole.log(error)
                        return {error: error}
                    })
                    if(translatorObjectId.error) {
                        return res.status(500).json({error: translatorObjectId.error})
                    }
            } else {
                translatorObjectId = translator
            }
            await registerBook({
                name,
                author: authorObjectId,
                pageCount,
                translator: translatorObjectId,
                price,
                coverSrc,
                genres,
                pageCount,
                publishYear
            })
            .then(response => {
                if(response.saved) {
                    return res.status(200).json({savedBook: response.savedBook})
                }
            })
            .catch(response => {
                console.log(response)
                return res.status(400)
                    .json(response.error)
            })
        } else {
            return res.status(500).json({error: "internal server error"})
        }
    }
}