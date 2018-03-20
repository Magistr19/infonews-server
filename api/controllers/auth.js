const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const validPass = require('../../customModules/cryptoPass').validPassword

module.exports.logIn = (req, res) => {
    Users.findOne({ login: req.body.userLogin })
        .then(user => {
            if (validPass(user.hash, user.salt)) {
                // create cookies and session
                req.session.isAuth = true;
                req.session.role = user.role;
                req.session.id = user._id;

                res.status(200).json({ message:'Вы успешно авторизовались!' });
            } else {
                res.status(400).json({ message: 'Неверный пароль!'})
            }
        })
        .catch(() => res.status(400).json({ message: 'Пользователь не найден!'}))
}

module.exports.logOut = (req, res) => {
    // destroy cookie and session
    req.session.destroy();
    res.status(200).json({ message: 'ok!' })
}