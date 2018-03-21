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
        type: Number,
        // required: [true, 'Укажите дату публикации'],
    },
    views: {
        type: Number,
        default: 0
    },
    categories: {
        title: {
            type: String,
            required: [true, 'Укажите основную категорию статьи'],
        },
        link: {
            type: String,
            required: [true, 'Укажите основную категорию статьи'],
        },
        subcategory: {
            title: {
                type: String,
                default: '',
            },
            link: {
                type: String,
                default: '',
            },
        },
    },
    picture: {
        type: String,
        required: [true, 'Укажите картинку статьи'],
    },
    content: {
        type: String,
        required: [true, 'Укажите содержимое статьи'],
    },
    shortcat: {
        type: String,
        required: [true, 'Укажите шорткат статьи'],
    }
});

mongoose.model('post', PostSchema);
