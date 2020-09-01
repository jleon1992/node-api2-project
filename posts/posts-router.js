const express = require("express");

const Db = require("../data/db"); // << update the path



router.get('/', (req, res) => {
    Db.find()
    .then(posts =>{
        res.status(200).json({ data: posts, parameters: req.query })
    })

    .catch(error => {
        res.status(500).json({ error: error.message })
    })
})

router.post('/', (req, res) => {
    // if(req.body.titled&&req.body.contents){
        Db.insert(req.body)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                error: 'Please provide title and contents for the post.'
            })
        })
    // }
    
})

router.get('/:id', (req, res) => {
    Db.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error retrieving the post'
        })
    })
})

router.get('/:id/comments', (req, res) => {
    Db.findPostComments(req.params.id)
    .then(comments =>{
        res.status(201).json(comments)
    })
    .catch(err => {
        console.log(err)
        res.status(500)

    })
})

router.post('/:id/comments', (req, res) => {
    Db.insertComment(req.body)
    .then(post => {
        res.status(201).json(post)
    })
})

router.put('/:id', (req, res) => {
    Db.update(req.params.id, req.body)
    .then(post => {
        res.status(200).json(post)
    })
})

router.delete('/:id', (req, res) => {
    Db.remove(req.params.id)
    .then(count => {
        console.log(count)
        res.status(200).json({ message: 'the post was deleted' })
    })
})

module.exports = router