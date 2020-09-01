const express = require('express')

const postsRouter = require('./posts/posts-router')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello')
})

server.use('/api/posts', postsRouter)

server.listen(8000, () => {
    console.log('server running on port 8000')
})