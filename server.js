const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const express = require('express');
const bodyParser = require('body-parser');


// Простая база данных пользователей (в реальном приложении лучше использовать базу данных)
const users = [];

// Обработка регистрации пользователей
app.post('/register', (req, res) => {
    // Получение данных о пользователе из тела запроса
    const { firstName, lastName, username, password, email, id, blocked, dateOfBirth } = req.body;
    
    // Проверка наличия всех обязательных полей
    if (!firstName || !lastName || !username || !password || !email || !id || !dateOfBirth) {
      return res.status(400).json({ message: 'Все поля должны быть заполнены' });
    }
  
    // Проверка наличия пользователя с таким логином или email в базе данных
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким логином или email уже существует' });
    }
  
    // Создание нового пользователя и добавление его в базу данных
    const newUser = { firstName, lastName, username, password, email, id, blocked, dateOfBirth };
    users.push(newUser);
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
});

// Обработка входа пользователя
app.post('/login', (req, res) => {
    // Получение логина и пароля из тела запроса
    const { username, password } = req.body;
  
    // Поиск пользователя в базе данных по логину и паролю
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Неправильный логин или пароль' });
    }
  
    // В реальном приложении здесь генерировался бы токен для аутентификации
    res.status(200).json({ message: 'Вход выполнен успешно' });
});

//  Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

