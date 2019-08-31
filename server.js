require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
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

app.listen(3005, () => {
    console.log('Server started')
})