import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
import dotenv from 'dotenv';

dotenv.config();

// This is your bot token
const TOKEN = process.env.TELEGRAM_TOKEN;
// const bot = new Telegraf(TOKEN);
const bot = new Bot(TOKEN);
// This is your web app link
const web_link = "https://eclectic-cajeta-1644ae.netlify.app";

// bot.start((ctx) =>
//   ctx.reply("Welcome hahaha", {
//     reply_markup: {
//       keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
//     },
//   })
// );

// bot.launch();

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.hears("play", async (ctx) => {
  ctx.reply("Playing", {
    reply_markup: {
      keyboard: [
        [{ text: "Play", web_app: { url: web_link } }],
      ],
    },
  })
})


// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.
const menu = new Menu("movements")
  .text("^", (ctx) => ctx.reply("Forward!")).row()
  .text("<", (ctx) => ctx.reply("Left!"))
  .text(">", (ctx) => ctx.reply("Right!")).row()
  .text("v", (ctx) => ctx.reply("Backwards!"));

  // Make it interactive.
bot.use(menu);

bot.command("menu", async (ctx) => {
  await ctx.reply("Here is your menu", { reply_markup: menu });
});

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));


// Start the bot.
bot.start();
