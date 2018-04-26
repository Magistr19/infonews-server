const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const config = require('../../config.json')
const Posts = mongoose.model('post');
const Categories = mongoose.model('category');


module.exports.getPostsByCategory = (req) => {
  console.log(req.query)
  const Category = req.params.cat;
  return new Promise(resolve => {
    Posts.find({ $or: [{ 'categories.link': Category }, { 'categories.subcategory.link': Category }]},
      { content: 0 })
      .sort({ date: -1 })
      .skip(+req.query.from)
      .limit(+req.query.to - +req.query.from)
      .then(items => resolve(items))
      .catch(e => console.error(e));
  });
};

module.exports.getLastPosts = (req, res) => {
  // find all categories
  Categories.find()
    .then(categories => {
      let promises = [];
      // create array of async func find posts in every category
      categories.forEach(category => {
        const findPostsInCategory = () => {
          return new Promise((resolve, reject) => {
            // find 5 posts in every category from categories
            Posts.find({ 'categories.link': category.link })
              .limit(5)
              .sort({ date: -1 })
              .then(posts => { resolve(posts); })
              .catch(err => reject(err));
          });
        };
        promises.push(findPostsInCategory());
      });

      Promise.all(promises)
        .then(arrayPosts => {
          let resultPosts = [];
          arrayPosts.map(posts => {
            if (posts.length) {
              resultPosts = resultPosts.concat(posts);
            }
          });
          res.status(201).json(resultPosts);
        })
        .catch(err => {
          res.status(400).json({
            message: `При добавление записи произошла ошибка:  + ${err.message}`
          });
        });
    });
};

module.exports.getPostById = (req) => {

  return new Promise(resolve => {
    Posts.findById(req.params.id)
      .then(post => {
        if (!req.headers['token']) {
          post.views++;
          post.save();
        }
        console.log('Post exist')
        resolve(post);
      })
      .catch(e => console.error(e));
  });
};

module.exports.postsAll = (req, res) => {
  const token = jwt.decode(req.headers['token'], config.token.secretKey)
  return new Promise(resolve => {
    Posts.find(token.role === 'Admin' ? {} : { author: token.author }, { content: 0 })
      .then(items => {
        resolve(items);
      })
      .catch(e => console.error(e));
  })
};

module.exports.addNewPost = (req, res) => {
  console.log('AddPost')
  const token = jwt.decode(req.headers['token'], config.token.secretKey)
  console.log(token)
  try {
  const Post = mongoose.model('post');
  let dir = '/upload/' + req.files[0].filename;
  let newPost = new Post({
    ...req.body,
    categories: JSON.parse(req.body.categories),
    picture: dir,
    date: Date.now(),
    author: token.author
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
  } catch (e) { console.log(e) }
}

module.exports.editPost = (req, res) => {
  const Posts = mongoose.model('post');
  Posts.findByIdAndUpdate(req.params.id, {
    ...req.body,
    categories: JSON.parse(req.body.categories),
    picture: req.files[0] ? `/upload/${req.files[0].filename}` : req.body.picture,
    date: Date.now()
  })
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
  let dir = '/upload/' + req.files[0].filename;
  res.send(dir);
}