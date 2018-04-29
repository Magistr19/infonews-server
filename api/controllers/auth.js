const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const validPass = require('../../customModules/cryptoPass').validPassword
const jwt = require('jwt-simple');
const config = require('../../config.json')

module.exports.logIn = (req, res) => {
    console.log(req.body)
    Users.findOne({ login: req.body.login })
        .then(user => {
            if (!user) throw new Error()
            if (validPass(user.hash, user.salt, req.body.password)) {
                // create token
                const token = jwt.encode({
                    isAuth: true,
                    role: user.role,
                    id: user._id,
                    author: user.name,
                }, config.token.secretKey)

                res.status(200).json({ message:'Вы успешно авторизовались!', token });
            } else {
                res.status(400).json({ message: 'Неверный пароль!'})
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(400).json({ message: 'Пользователь не найден!'});
        })
}

module.exports.logOut = (req, res) => {
    // destroy cookie and session
    req.session.destroy();
    res.status(200).json({ message: 'ok!' })
}