const mongoose = require('mongoose');

module.exports.getAll = (req) => {
    const Category = mongoose.model('category');
    return new Promise(resolve =>{
        Category.find().then(items => {
            resolve(items);
        })
        .catch(e => console.error(e));
    });
};

module.exports.addNew = (req, res) => {
    const Category = mongoose.model('category');
    let newCategory = new Category(req.body);
    //сохраняем запись в базе
    newCategory
    .save()
    .then(() => {
        return res.status(201).json({ message: 'Запись успешно добавлена' });
    })
    .catch(err => {
        res.status(400).json({
            message: `При добавление записи произошла ошибка:  + ${err.message}`
        });
    });
};

module.exports.editCategory = (req, res) => {
    const Category = mongoose.model('category');

    Category.findByIdAndUpdate(req.body._id, req.body, {upsert:true})
    .then(item => {
        if (!!item) {
            res.status(200).json({ message: 'Запись успешно обновлена' });
        } else {
            res.status(404).json({ message: 'Запись в БД не обнаружена' });
        }
    })
    .catch(err => {
        res.status(400).json({
            message: `При обновлении записи произошла ошибка:  + ${err.message}`
        });
    });
};

module.exports.removeCategory = (req, res) => {
    const Category = mongoose.model('category');
    Category.findByIdAndRemove(req.params.id)
    .then(item => {
        if (!!item) {
            res.status(200).json({ message: 'Запись успешно обновлена' });
        } else {
            res.status(404).json({ message: 'Запись в БД не обнаружена' });
        }
    })
    .catch(err => {
            res.status(400).json({
            message: `При удалении записи произошла ошибка:  + ${err.message}`
        });
    });
}