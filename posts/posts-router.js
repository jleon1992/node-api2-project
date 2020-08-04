const express = require("express");

const Db = require("../data/db"); // << update the path


const router = express.Router();

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
    Db.insert(req.body)
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error adding post'
        })
    })
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
        res.status(200).json(comments)
    })
    .catch(err => {
        console.log(err)
        res.status(500)

    })
})

router.post('/:id/comments', (req, res) => {
    Db.insertComment(req.body)
    .then(post => {
        if (count > 0) {
            res.status(200).json({ message: "The hub has been nuked" });
        } else {
            res.status(404).json({ message: "The hub could not be found" });
        }
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