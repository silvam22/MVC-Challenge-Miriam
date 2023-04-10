const express = require('express')
const router = express.Router()
const db = require('../models');

const { Post } = require('../models')

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body)
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});
// Create a new post
router.post('/api/posts', (req, res) => {
    db.Post.create({
        title: req.body.title,
        content: req.body.content
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error creating post' });
        });
});

// Get all posts
router.get('/api/posts', (req, res) => {
    db.Post.findAll({
        include: [
            {
                model: db.Comment
            }
        ]
    })
        .then((posts) => {
            res.render('posts', { posts });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error getting posts' });
        });
});

// Create a new comment for a post
router.post('/api/posts/:id/comments', (req, res) => {
    db.Comment.create({
        name: req.body.name,
        content: req.body.content,
        postId: req.params.id
    })
        .then(() => {
            res.redirect(`/posts/${req.params.id}`);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error creating comment' });
        });
});

// Delete a post and its comments
router.delete('/api/posts/:id', (req, res) => {
    db.Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.json({ message: 'Post deleted' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error deleting post' });
        });
});

module.exports = router;
