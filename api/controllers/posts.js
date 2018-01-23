const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports.getPostsByCategory = (req) => {

    const Posts = mongoose.model('post');
    const Category = req.params.cat;
    return new Promise(resolve => {
        Posts.find({ 
                $or: [ 
                    {'categories.link': Category },
                    { 'categories.subcategory.link': Category }
                ]},
                { content: 0 }
            )
            .then(items => {
                resolve(items);
            })
            .catch(e => console.error(e));
    });
};

module.exports.getLastPosts = (req, res) => {

    const Posts = mongoose.model('post');
    const Categories = mongoose.model('category');
    // create request obj
    const findPostsRequest = (categories) => {
        if (!categories.length) return {};
        let request = { $or: []};
        categories.forEach(category => {
            request.$or.push({ 'categories.link': category.link});
        });
        console.log(request);
        return request;
    };
    // find all categories
    Categories.find()
        .then(categories => {
            // find 5 posts in every category from categories
            Posts.find(findPostsRequest(categories))
                .then(posts => {
                    res.status(201).json(posts);
                })
                .catch(err => {
                    res.send({
                        message: `Ой ошибка:  + ${err.message}`
                    });
                });
        })
        .catch(err => {
            res.status(400).json({
                message: `При получени записей произошла ошибка:  + ${err.message}`
            });
        });
};

module.exports.getPostById = (req) => {

    const Posts = mongoose.model('post');
    return new Promise(resolve => {
        Posts.find({ _id: req.params.id })
            .then(items => {
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
            let newPost = new Post({
                ...fields,
                picture: dir,
                categories: JSON.parse(fields.categories),
            });

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

module.exports.editPost = (req, res) => {
    const Posts = mongoose.model('post');
    Posts.findByIdAndUpdate(req.body._id, req.body)
        .then(() => {
            return res.status(201).json({ message: 'Запись успешно обновлена!' });
        })
        .catch(err => {
            res.status(400).json({
                message: `При обновлении записи произошла ошибка:  + ${err.message}`
            });
        });
}

module.exports.removePost = (req, res) => {
    const Posts = mongoose.model('post');
    Posts.findByIdAndRemove(req.params.id)
        .then(() => {
            return res.status(201).json({ message: 'Запись успешно удалена' });
        })
        .catch(err => {
            res.status(400).json({
                message: `При удалении записи произошла ошибка:  + ${err.message}`
            });
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
            let dir = 'http://localhost:3000/upload/' + files.file.name;//.substr(fileName.indexOf('//'));

            res.send(dir);
        });
    });
}