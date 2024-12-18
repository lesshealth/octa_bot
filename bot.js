const TelegramBot = require('node-telegram-bot-api');

const token = '7207562918:AAFSDKbYDsQWtSY4-iMjI0yLTIgLxeHKBcI';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        `Список доступных команд:
/help - список всех команд
/site - ссылка на сайт Октагона
/creator - ФИО создателя`
    );
});

bot.onText(/\/site/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Ссылка на сайт Октагона: https://students.forus.ru/');
});


bot.onText(/\/creator/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Попович Андрей Александрович');
});

console.log('Бот запущен!');
