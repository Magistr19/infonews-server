const express = require('express');
const router = express.Router();

const categories = require('../controllers/categories');
const posts = require('../controllers/posts');
//
//Handle blog requests
router.get('/allCategories', (req, res) => {
    categories.getAll(req)
    .then(result => {
        res.send(result);
    });
});

router.post('/addCategory', categories.addNew);

router.put('/editCategory', categories.editCategory);

router.delete('/removeCategory/:id', categories.removeCategory);

router.get('/posts/:cat', (req, res) => {
    posts.getPostsByCategory(req)
    .then(result => res.send(result));
});

router.get('/lastPosts', (req, res) => {
    posts.getLastPosts(req)
    .then(result => res.send(result));
});

router.get('/post:id', (req, res) => {
    posts.getPostById(req)
    .then(result => res.send(result));
});

module.exports = router;
