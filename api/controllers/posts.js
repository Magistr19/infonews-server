const mongoose = require('mongoose');

module.exports.getPostsByCategory = (req) => {
    const Posts = mongoose.model('posts');
    const Category = req.params.cat;
    return new Promise(resolve => {
        Posts.find({ category: Category })
            .then(items => {
                console.log('Category: ', Category, 'Posts: ', items);
                resolve(items);
            })
            .catch(e => console.error(e));
    });
};

module.exports.getLastPosts = (req) => {
    const Posts = mongoose.model('posts');
    const Categories = mongoose.model('category');
    // result array
    const posts = [];
    let currentCategoryIndex = 0;
    // async function - find posts in current category
    const findPosts = (categories) => {
        return new Promise(resolve => {
            // find 5 posts in this category
            Posts.find({ category: categories[currentCategoryIndex] })
                .limit(5)
                .then(items => {
                    // concat posts in this category to result array
                    if (items) { posts.concat(items); }
                    // and go to next category
                    currentCategoryIndex++;
                    // if next category exist - go find post in next category and exit from current
                    if (categories.length < currentCategoryIndex) {
                        findPosts(categories);
                        resolve();
                    }
                    // exit, if categories end
                    resolve();
                })
                .catch(e => { console.error(e); return posts; });
        });
    };
    // main function...
    return new Promise(res => {
        // find all categories
        Categories.find()
            .then(categories => {
                if (categories) {
                    // find 5 posts in every category from categories
                    findPosts(categories)
                        .then(() => { return; });
                }
                return;
            })
            .then(() => {
                res.send(post);
            })
            .catch(e => console.error(e));
    });
};

module.exports.getPostById = (req) => {
    const Posts = mongoose.model('posts');
    return new Promise(resolve => {
        Posts.find({ _id: req.params.id })
            .then(items => {
                console.log('Category: ', Category, 'Posts: ', items);
                resolve(items);
            })
            .catch(e => console.error(e));
    });
};

module.exports.postsAll = (req, res) => {
    const Posts = mongoose.model('posts');
    Posts.find({}, { picture: 0, content: 0 })
        .then(items => {
            console.log('Posts: ', items);
            res.status(201).json(items);
        })
        .catch(e => console.error(e));
};

module.exports.addNewPost = (req, res) => {
    const Post = mongoose.model('posts');
    let newPost = new Category(req.body);
    //сохраняем запись в базе
    newPost
        .save()
        .then(() => {
            return res.status(201).json({ message: 'Запись успешно добавлена' });
        })
        .catch(err => {
            res.status(400).json({
                message: `При добавление записи произошла ошибка:  + ${err.message}`
            });
        });
}