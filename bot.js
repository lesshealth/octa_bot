const TelegramBot = require('node-telegram-bot-api');

const token = '7207562918:AAFSDKbYDsQWtSY4-iMjI0yLTIgLxeHKBcI';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, октагон!');
});

console.log('Бот запущен');
