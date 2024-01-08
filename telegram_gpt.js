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
    const userInput = msg.text;

    try {
        // Send status message to user
        await bot.sendMessage(chatId, "Obteniendo respuesta...");
        console.log("Mensaje del usuario: " + userInput);

        // OpenAI API call
        const systemInput = 'Respira profundamente, coge aire y piensa paso a paso antes de responder. ' +
            'Necesito que me respondas a la cuesti�n que te planteo de la mejor manera posible, ' +
            'el mundo est� a punto de acabar y tu respuesta podr�a ser crucial. ';

        const completion = await openai.chat.completions.create({
            messages: [
                {role: 'system', content: systemInput},
                {role: 'user', content: userInput}
            ],
            model: 'gpt-4-1106-preview',
        });

        // Sending response to Telegram
        const responseContent = completion.choices[0].message.content;
        await bot.sendMessage(chatId, responseContent);
    } catch (error) {
        // Handle errors
        console.error('Error with API call:', error.message);
        await bot.sendMessage(chatId, 'Houston, tenemos un problema!');
        await bot.sendMessage(chatId, 'ERROR: ' + error.message);
    }
});
