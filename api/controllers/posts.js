const mongoose = require('mongoose');

module.exports.getPostsByCategory = (req) => {

  const Posts = mongoose.model('post');
  const Category = req.params.cat;
  return new Promise(resolve => {
    Posts.find({ $or: [{ 'categories.link': Category }, { 'categories.subcategory.link': Category }]},
      { content: 0 })
      .sort({ date: -1 })
      .then(items => resolve(items))
      .catch(e => console.error(e));
  });
};

module.exports.getLastPosts = (req, res) => {
  const Posts = mongoose.model('post');
  const Categories = mongoose.model('category');
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
              console.log(posts);
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
  console.log('post!');
  const Post = mongoose.model('post');
  console.log(req.files);
  let dir = '/upload/' + req.files[0].filename;
  const parsedData = JSON.parse(req.body.data);
  let newPost = new Post({
    ...parsedData,
    content: parsedData.HTML,
    picture: dir,
  });
  console.log(newPost);

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

module.exports.editPost = (req, res) => {
  const Posts = mongoose.model('post');
  console.log('File: ', req.files[0])
  console.log('Body: ', req.body, req.params.id);
  const parsedData = JSON.parse(req.body.data);
  Posts.findByIdAndUpdate(req.params.id, {

    ...parsedData,
    content: parsedData.HTML,
    picture: req.files[0] ? `/upload/${req.files[0].filename}` : parsedData.picture,

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