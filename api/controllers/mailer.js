const nodemailer = require('nodemailer');
const config = require('./../../config.json');

module.exports = (userData) => {
    //инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
      from: `"Администрация Infonews"`,
      to: userData.email,
      subject: 'Доступ автора на сайте infonews',
      html: `<h3>Здравствуйте, ${userData.name}</h3>
      <p>Администрация Infonews сообщает вам, что вы успешно зарегистрированы редактором!</p>
      <p>Вы можете перейти на сайт и авторизоваться с помощью логин/почтового ящика и пароля</p>
      <p>Логин: <b>${userData.login}</b></p>
      <p>Пароль: <b>${userData.password}</b></p>
      <p>Он сгенерированы автоматически, не сообщайте их <b>никому!</b></p>`
    };
      //отправляем почту
      transporter.sendMail(mailOptions)
      .then(() => { message: 'Пользователь успешно зарегстрирован, доступы отправлены на почту!' })
      .catch(e => console.error('error', e));
  } 