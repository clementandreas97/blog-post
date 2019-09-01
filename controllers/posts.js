const Post = require('../models/post')

// Cache
const redis = require('redis')
const client = redis.createClient(process.env.REDIS_PORT)

// Cache Middleware
exports.cachePosts = async (req, res, next) => {
   client.get('posts', (error, data) => {
       if (error) throw error

       if (data !== null) {
           res.json(JSON.parse(data))
       } else {
           next()
       }
   })
}

exports.getAll = async (req, res, next) => {
    try {
        const posts = await Post.find()
        client.setex('posts', 3600, JSON.stringify(posts))
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}