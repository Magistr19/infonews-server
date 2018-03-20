const express = require('express');
const router = express.Router();

const categories = require('../controllers/categories');
const posts = require('../controllers/posts');
const auth = require('../controllers/auth');
const users = require('../controllers/users');

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.sendStatus(403)
    }
}
const isAdmin = (req, res, next) => {
    if (req.session.role === 'Admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}
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

router.get('/lastPosts', posts.getLastPosts);

router.get('/post/:id', (req, res) => {
    posts.getPostById(req)
        .then(result => res.send(result));
});

router.get('/postsAll', (req, res) => {
    posts.postsAll(req)
        .then(result => res.send(result));
});

router.post('/addNewPost', posts.addNewPost);

router.put('/editPost/:id', posts.editPost);

router.delete('/removePost/:id', posts.removePost);

router.post('/loadFiles', posts.loadFiles);


router.post('/logIn', auth.logIn);
router.post('/logOut', auth.logOut);
router.get('/getCurrentUser', users.getCurrentUser);
router.get('/getAllUsers', users.getAllUsers);
router.post('/createNewUser', users.createNewUser);


module.exports = router;
