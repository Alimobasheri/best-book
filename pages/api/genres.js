import {connect, addGenre, findGenre} from '../../database'

export default async function genres(req, res) {
    if(req.method === "GET") {
        const {
            name
        } = req.query
        const connected = await connect()
        if(connected.status) {
            if(!name) {
                await findGenre()
                .then(response => {
                    if(response.found) {
                        return res.status(200).json({genres: response.foundGenres})
                    }
                })
                .catch(error => {
                    res.status(400).json({error})
                })
            } else {
                await findGenre(name)
                .then(response => {
                    if(response.found) {
                        return res.status(200).json(response.foundGenre)
                    }
                })
                .catch(error => {
                    res.status(400).json({error})
                })
            }
        } else {
            return res.status(500).json({error: "Internal server error."})
        }
    } else if(req.method === "POST") {
        const {
            name
        } = req.body
        if(!name) {
            return res.status(400).json({
                error: "Please send all required fields."
            })
        }

        const connected = await connect()
        if(connected.status) {
            await addGenre({
                name
            })
            .then(response => {
                if(response.saved) {
                    res.status(200)
                        .json({
                            savedGenre: response.savedGenre
                        })
                }
            })
            .catch(error => {
                res.status(400)
                    .json({
                        error
                    })
            })
        } else {
            res.status(500)
                .json({
                    error
                })
        }
    }
}