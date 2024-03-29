const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const setPassword = require('../../customModules/cryptoPass').setPassword;
const randomizer = require('../../customModules/randomizer');
const mailer = require('./mailer');
const jwt = require('jwt-simple');
const config = require('../../config.json')

module.exports.getCurrentUser = (req, res) => {
    const id = jwt.decode(req.headers['token'], config.token.secretKey).id;
    Users.findById(id, { hash: 0, salt: 0})
        .then(user => res.status(201).json(user))
        .catch(e => res.status(400).json({ message: e.message }))
}

module.exports.getAllUsers = (req, res) => {
    Users.find({}, { hash: 0, salt: 0 })
        .then(users => res.status(201).json(users))
        .catch(e => { console.log(e.message); res.status(201).json([])})
}

module.exports.createNewUser = (req, res) => {

    // create userData
    const userData = {
        password: randomizer(10),
        login: randomizer(6),
        email: req.body.email,
        name: req.body.nick,
    }
    // create hash and salt from 10 random symbols
    const hashSalt = setPassword(userData.password);
    // create user in DB
    const newUser = new Users({
        name: userData.name,
        login: userData.login,
        email: userData.email,
        hash: hashSalt.hash,
        salt: hashSalt.salt,
        role: 'Author'
    })
    newUser.save()
        .then(() => mailer(userData))
        .then(message => res.status(200).json({ message: 'Автор успішно створен!' }))
        .catch(e => res.status(400).json({ message: e.message }))
}

module.exports.deleteUser = (req, res) => {
    Users.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).json({ message: 'Автор успішно видален!' }))
        .catch(e => res.status(400).json({ message: e.message }))
}