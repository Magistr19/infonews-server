const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Укажите название рубрики'],
    },
    link: {
        type: String,
        required: [true, 'Укажите ссылку рубрики'],
    },
    subcategories: [
        {
            title: {
                type: String,
                required: [true, 'Укажите название рубрики'],
            },
            link: {
                type: String,
                required: [true, 'Укажите ссылку рубрики'],
            },
        },
    ],
});

mongoose.model('category', CategorySchema);
