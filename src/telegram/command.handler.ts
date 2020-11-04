import { Injectable } from '@nestjs/common'
import {
  Help,
  Hears,
  Context,
  Command,
  InjectBot,
  TelegrafProvider,
} from 'nestjs-telegraf'

@Injectable()
export class CommandHandler {
  constructor(@InjectBot() private bot: TelegrafProvider) {
    this.bot.use(async (ctx, next) => {
      ctx.foo = 123
      await next()
    })
  }

  SUBSCRIBE = 'subscribe'
  UNSUBSCRIBE = 'unsubscribe'
  FORECAST = 'forecast'
  RATE = 'rate'

  supportedCommands = [
    this.SUBSCRIBE,
    this.UNSUBSCRIBE,
    this.FORECAST,
    this.RATE,
  ]

  @Help()
  help(ctx: Context) {
    ctx.reply("Please type '/' to see available commands")
  }

  @Hears(/^[a-zA-Z].*/)
  hears(ctx: Context) {
    const supported = this.supportedCommands.map(c => '/' + c).join(',')
    ctx.reply(`I only support ${supported}`)
  }

  @Command('subscribe')
  subscribe(ctx: Context) {
    ctx.reply('you are now subscribed')
  }

  @Command('unsubscribe')
  unsubscribe(ctx: Context) {
    ctx.reply('you are now unsubscribed')
    ctx.reply
  }

  @Command('forecast')
  forecast(ctx: Context) {
    ctx.reply("here is tomorrow's forecast")
  }

  @Command('rate')
  rate(ctx: Context) {
    // TODO: memoize
    const keyboardMarkup = {
      reply_markup: this.rateKeyboard(),
    }
    ctx.reply('stars rate', keyboardMarkup)
  }

  rateKeyboard() {
    return {
      keyboard: [
        [
          { text: '1', request_location: true },
          { text: '2', request_location: true },
          { text: '3', request_location: true },
          { text: '4', request_location: true },
          { text: '5', request_location: true },
        ],
      ],
      resizeKeyboard: true,
    }
  }
}
