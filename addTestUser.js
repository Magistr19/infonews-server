const mongoose = require('mongoose');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = require('./config');
mongoose.Promise = global.Promise;
mongoose
    .connect(`mongodb://${config.db.user}:${config.db.password}@ds261527.mlab.com:${config.db.port}/${config.db.name}`)
    .catch(e => {
        console.error(e);
        throw e;
    });

//логин и пароль, изначально пустые
let login = '',
    password = '',
    role = '';

//спрашиваем логин
rl.question('Логин: ', answer => {
    //записываем введенный логин
    login = answer;

    //спрашиваем пароль
    rl.question('Пароль: ', answer => {
        //записываем введенный пароль
        password = answer;
        rl.question('Роль: ', answer => {

            role = answer;
            //завершаем ввод
            rl.close();
        });
    });
});

//когда ввод будет завершен
rl.on('close', () => {
    //подключаем модель пользователя
    require('./api/models/users');
    const setPassword = require('./customModules/cryptoPass').setPassword;
    const hashSalt = setPassword(password);
    //создаем экземпляр пользователя и указываем введенные данные
    const User = mongoose.model('Users');
    const adminUser = new User({
        login: login,
        email: 'test@gmail.com',
        hash: hashSalt.hash,
        salt: hashSalt.salt,
        role: role
    });
    //пытаемся найти пользователя с таким логином
    User.findOne({ login: login })
        .then(u => {
            //если такой пользователь уже есть - сообщаем об этом
            if (u) {
                throw new Error('Такой пользователь уже существует!');
            }

            //если нет - добавляем пользователя в базу
            return adminUser.save();
        })
        .then(u => console.log('ok!'), e => console.error(e.message))
        .then(() =>
            mongoose.connection.close(function () {
                process.exit(0);
            })
        );
});
