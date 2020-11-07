import { Logger } from './../common/logger'
import { CommandHandler } from './command.handler'
import { Injectable } from '@nestjs/common'
import {
  Help,
  Hears,
  Context,
  Command,
  InjectBot,
  TelegrafProvider,
} from 'nestjs-telegraf'
import { Markup } from 'telegraf'

@Injectable()
export class CommandReceiver {
  constructor(
    @InjectBot() private bot: TelegrafProvider,
    private readonly logger: Logger,
    private readonly commandHandler: CommandHandler,
  ) {
    this.bot.use(async (ctx, next) => {
      ctx.reply('', Markup.removeKeyboard().extra())
      await next()
    })
  }

  SUBSCRIBE = 'subscribe'
  UNSUBSCRIBE = 'unsubscribe'
  FORECAST = 'forecast'
  RATE = 'rate'

  // TODO: get supported commands from getMyCommands
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

  @Hears(/^[a-zA-Z0-9].*/)
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
  }

  @Command('forecast')
  async forecast(ctx: Context) {
    try {
      const screenshotBuffer = await this.commandHandler.forecast()
      await ctx.replyWithPhoto({
        source: Buffer.from(screenshotBuffer),
      })
    } catch (ex) {
      this.logger.log(ex)
      await ctx.reply('could not get forecast')
    }
  }

  @Command('rate')
  rate(ctx: Context) {
    ctx.reply('stars rate', this.commandHandler.rateKeyboard())
  }
}