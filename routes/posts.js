const PostController = require('../controllers/posts')

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Comment = require('../models/comment')

// Get all posts
router.get('/', PostController.getAll)

// Get a post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

// Create a post
router.post('/', async (req, res) => {
    const currentPost = new Post({
        title: req.body.title,
        content: req.body.content
    })
    try {
        const newPost = await currentPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update a post
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title
    }

    if (req.body.content != null) {
        res.post.content = req.body.content
    }

    if (req.body.content != null || req.body.title != null) {
        res.post.updated_at = Date.now
    }

    if (req.body.comment != null) {
        const currentComment = new Comment({
            title: req.body.comment.title,
            content: req.body.comment.content,
            parent: req.query.parent
        })
        res.post.comments.push(currentComment)
    }

    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete a Post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({ message: "Post Deleted" })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a Post by id
async function getPost(req, res, next) {
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.post = post
    next()
}

module.exports = router
