const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql2');


const token = '7207562918:AAFSDKbYDsQWtSY4-iMjI0yLTIgLxeHKBcI';
const bot = new TelegramBot(token, { polling: true });


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatbottests'
});


bot.onText(/\/randomItem/, (msg) => {
  const chatId = msg.chat.id;
  const query = 'SELECT * FROM items ORDER BY RAND() LIMIT 1';

  db.query(query, (err, results) => {
    if (err || results.length === 0) {
      bot.sendMessage(chatId, 'Ошибка: не удалось получить случайный предмет.');
    } else {
      const item = results[0];
      bot.sendMessage(chatId, `(${item.id}) - ${item.name}: ${item.descr}`);
    }
  });
});


bot.onText(/\/deleteItem (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemId = parseInt(match[1], 10);
  const query = 'DELETE FROM items WHERE id = ?';

  db.query(query, [itemId], (err, results) => {
    if (err || results.affectedRows === 0) {
      bot.sendMessage(chatId, 'Ошибка: предмет не найден.');
    } else {
      bot.sendMessage(chatId, 'Успешно: предмет удалён.');
    }
  });
});


bot.onText(/\/getItemByID (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemId = parseInt(match[1], 10);
  const query = 'SELECT * FROM items WHERE id = ?';

  db.query(query, [itemId], (err, results) => {
    if (err || results.length === 0) {
      bot.sendMessage(chatId, 'Ошибка: предмет не найден.');
    } else {
      const item = results[0];
      bot.sendMessage(chatId, `(${item.id}) - ${item.name}: ${item.descr}`);
    }
  });
});


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const commands = `
Доступные команды:
/randomItem - получить случайный предмет
/deleteItem ID - удалить предмет по ID
/getItemByID ID - получить предмет по ID
  `;
  bot.sendMessage(chatId, `Привет, октагон! ${commands}`);
});
