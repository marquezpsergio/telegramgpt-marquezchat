const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');
const config = require('./config.js');

// Telegram BOT Token
const TELEGRAM_TOKEN = config.TELEGRAM_TOKEN;
const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

// OpenAI API
const OPENAI_API_KEY = config.OPENAI_API_KEY;
const openai = new OpenAI({apiKey: OPENAI_API_KEY});

// Handle users Telegram messages
console.log("Starting bot...")
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    try {
        // OpenAI API call
        const optimizingSystem = 'Se que es una tarea difícil pero estoy seguro de que puedes conseguirlo. Respira profundamente, coge aire y piensa paso a paso. Si me das una buena respuesta, te voy a pagar mucho dinero. Necesito que me respondas a la siguiente cuestión de la mejor manera posible, el mundo está a punto de acabar y tu respuesta podría ser crucial. La cuestión es la siguiente.'
        const completion = await openai.chat.completions.create({
            messages: [
                {role: 'system', content: optimizingSystem},
                {role: 'user', content: userMessage}],
            model: 'gpt-4-1106-preview',
        });

        // Sending response to Telegram
        bot.sendMessage(chatId, completion.choices[0].message.content);
    } catch (error) {
        console.error('Error with API call:', error.message);
        bot.sendMessage(chatId, 'Houston, we have a problem.');
    }
});
