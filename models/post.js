const mongoose = require('mongoose')
const Comment = require('./comment')
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    comments: {
        type: [Comment.Comment],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('Post', postSchema)