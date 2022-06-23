require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const api = require('covid19-api');
// const Markup = require('telegraf/markup');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}!
Узнай статистику по Ковиду20.
Введи на английском названия страны и ахуей от сметрности.
Посмотреть весь список стран можно командочкой /help
`,
    Markup.keyboard([
        ['US', 'Italy'],
        ['Ukraine', 'Kazakhstan'],
    ])
))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('text', async (ctx) => {
    let data = {};

    try {
        data = await api.getReportsByCountries(ctx.message.text);

    const formatData = `
Страна: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
    `;
    ctx.reply(formatData);
    } catch {
        console.log('Ошибка');
        ctx.reply('Ошибка, такой страны нету')
    }
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();

console.log('бот на старте')


