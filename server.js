require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/index')

mongoose.connect(config.db, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})
db.once('open', () => {
    console.log('Connected to Database')
})

app.use(express.json())

const postsRoutes = require('./routes/posts')
app.use('/posts', postsRoutes)

app.listen(config.port, () => {
    console.log(`Server started ${config.port} -- ${config.env}`)
})