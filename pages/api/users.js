import { connect, registerUserProfile, findUserByEmail } from '../../database'

export default async function users(req, res) {
    if (req.method === 'GET') {
        const {
            email
        } = req.query
        if(!email) {
            return res.status(402).json({error: "Please provide user email."})
        }
        const connected = await connect()
        if (connected.status) {
            findUserByEmail(email)
                .then(foundUser => {
                    if(foundUser.found) {
                        res.status(200)
                            .json({
                                user: foundUser.user
                            })
                    } else {
                        res.status(200)
                            .json({
                                error: foundUser.error
                            })
                    }
                })
        } else {
            return res.status(500).json({
                status: false,
                error: "Internal server error."
            })
        }
    }

    if (req.method === "POST") {
        const {
            name,
            lastName,
            email,
            favoriteBooks,
            favoriteGenres,
            favoriteWriters,
            reviews,
            likedReviews,
            replies,
            orders
        } = req.body
        if (!name || !lastName || !email) {
            res.status(400).json({
                error: "All required fields must be sent",
                sentBody: req.body
            })
        } else {
            const connected = await connect()
            if(connected.status) {
                const userRegistration = await registerUserProfile({
                    name,
                    lastName,
                    email,
                    favoriteBooks: favoriteBooks || [],
                    favoriteGenres: favoriteGenres || [],
                    favoriteWriters: favoriteWriters || [],
                    reviews: reviews || [],
                    likedReviews: likedReviews || [],
                    replies: replies || [],
                    orders: orders || []
                })
                if(userRegistration.status) {
                    res.status(200).json({
                        message: "User Profile Was Successfully Registered!",
                        savedUser: userRegistration.savedUser
                    })
                } else {
                    res.status(400).json({
                        error_message: userRegistration.error,
                    })
                }
            } else {
                res.status(connected.statusCode).json({
                    status: connected.status,
                    error_message: connected.error
                })
            }
        }
    }
}