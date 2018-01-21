const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const fileLoad = require('express-fileupload');

module.exports.getPostsByCategory = (req) => {
    const Posts = mongoose.model('post');
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

module.exports.getLastPosts = (req, res) => {
    const Posts = mongoose.model('post');
    const Categories = mongoose.model('category');
    // result array
    let posts = [];
    let currentCategoryIndex = 0;
    // async function - find posts in current category
    const findPosts = (categories) => {
        return Posts.find({ category: categories[currentCategoryIndex].title })
            .limit(5)
            .then(items => {
                // concat posts in this category to result array
                if (items.length) { posts = posts.concat(items); }
                // and go to next category
                currentCategoryIndex++;
                // if next category exist - go find post in next category and exit from current
                if (currentCategoryIndex < categories.length - 1) {
                    findPosts(categories);
                    return;
                }
                // exit, if categories end
                return;
            })
            .catch(e => { console.error(e); return posts; });
    };
    // main function...
    // find all categories
    Categories.find()
        .then(categories => {
            if (categories) {
                // find 5 posts in every category from categories
                findPosts(categories)
                    .then(() => res.status(201).json(posts))
                    .catch(err => {
                        res.send({
                            message: `Ой ошибка:  + ${err.message}`
                        });
                    });
            }
            else {
                res.status(400).json([]);
            }
            
        })
        .catch(err => {
            res.status(400).json({
                message: `При добавление записи произошла ошибка:  + ${err.message}`
            });
        });
};

module.exports.getPostById = (req) => {
    const Posts = mongoose.model('post');
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
    const Posts = mongoose.model('post');
    return new Promise(resolve => {
        Posts.find()
            .then(items => {
                console.log('Posts: ', items);
                resolve(items);
            })
            .catch(e => console.error(e));
    })
};

module.exports.addNewPost = (req, res) => {

    const Post = mongoose.model('post');
    let form = new formidable.IncomingForm();
    let upload = 'public/upload';
    let fileName;

    // create upload dir
    if (!fs.existsSync(upload)) { fs.mkdirSync(upload); }
    // uploading file
    form.uploadDir = path.join(process.cwd(), upload);
    // parsing req form
    form.parse(req, function (err, fields, files) {
        // get filename
        fileName = path.join(upload, files.poster.name);
        // rename file
        fs.rename(files.poster.path, fileName, function (err) {
            // if error - delete file
            if (err) {
                console.log(err);
                fs.unlink(fileName);
                fs.rename(files.poster.path, fileName);
            }
            // save directory
            let dir = 'http://localhost:3000/upload/' + files.poster.name;//.substr(fileName.indexOf('//'));
            console.log(dir);
            console.log(fields);
            let newPost = new Post({ ...fields, picture: dir });
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
        })
    });
}


module.exports.loadFiles = (req, res) => {
    let form = new formidable.IncomingForm();
    let upload = 'public/upload';
    let fileName;
    // create upload dir
    if (!fs.existsSync(upload)) {
        fs.mkdirSync(upload);
    }
    // uploading file
    form.uploadDir = path.join(process.cwd(), upload);
    // parsing req form
    form.parse(req, function (err, fields, files) {
        // get filename
        fileName = path.join(upload, files.file.name);
        // rename file
        fs.rename(files.file.path, fileName, function (err) {
            // if error - delete file
            if (err) {
                console.log(err);
                fs.unlink(fileName);
                fs.rename(files.file.path, fileName);
            }
            // save directory
            let dir = 'http://localhost:3000/' + fileName.replace('/public', '');//.substr(fileName.indexOf('//'));

            res.send(dir);
        });
    });
}