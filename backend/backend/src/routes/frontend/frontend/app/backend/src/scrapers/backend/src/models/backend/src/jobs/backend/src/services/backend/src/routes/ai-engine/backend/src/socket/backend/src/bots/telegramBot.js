const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true
});

bot.onText(/\/picks/, async (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Pronósticos IA actualizados.'
  );
});
