const Post = require('../models/post')

exports.getAll = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}