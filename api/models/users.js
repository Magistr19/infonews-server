const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: String,
    login: String,
    hash: String,
    salt: String,
    role: String
})

mongoose.model('Users', UsersSchema);