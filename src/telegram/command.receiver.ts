import { UserEntity } from './entities/user.entity'
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

  supportedCommands = [
    { command: 'subscribe', description: 'Subscribe to daily forecast' },
    { command: 'unsubscribe', description: 'Unsubscribe from daily forecast' },
    { command: 'forecast', description: "Get tomorrow's forecast" },
    { command: 'rate', description: 'Rate current sea' },
  ]

  @Help()
  help(ctx: Context) {
    ctx.reply("Please type '/' to see available commands")
  }

  @Hears(/^[a-zA-Z0-9].*/)
  hears(ctx: Context) {
    const supported = this.supportedCommands.map(c => '/' + c.command).join(',')
    ctx.reply(`I only support ${supported}`)
  }

  @Command('subscribe')
  async subscribe(ctx: Context) {
    const user = UserEntity.fromTelegramUser(ctx.from)
    await this.commandHandler.subscribe(user)
    ctx.reply(
      'you are now subscribed to the daily forecast! to unsubscribe please send /unsubscribe',
    )
  }

  @Command('unsubscribe')
  async unsubscribe(ctx: Context) {
    const user = UserEntity.fromTelegramUser(ctx.from)
    await this.commandHandler.unsubscribe(user)
    ctx.reply('you are now unsubscribed from the daily forecast')
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
    ctx.reply('stars rate', this.rateKeyboard)
  }

  private rateKeyboard = {
    reply_markup: {
      keyboard: [
        [
          { text: '1' },
          { text: '2' },
          { text: '3' },
          { text: '4' },
          { text: '5' },
        ],
      ],
    },
    one_time_keyboard: true,
    resizeKeyboard: true,
  }
}
