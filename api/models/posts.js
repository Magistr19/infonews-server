const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Укажите заголовок статьи'],
    },
    author: {
        type: String,
        // required: [true, 'Укажите автора статьи'],
    },
    date: {
        type: String,
        // required: [true, 'Укажите дату публикации'],
    },
    category: {
        type: String,
        required: [true, 'Укажите основную категорию статьи'],
    },
    subcategory: {
        type: String,
    },
    picture: {
        type: String,
        required: [true, 'Укажите картинку статьи'],
    },
    content: {
        type: String,
        required: [true, 'Укажите содержимое статьи'],
    },
});

mongoose.model('post', PostSchema);
