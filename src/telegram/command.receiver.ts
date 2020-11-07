import { UserEntity } from './entities/user.entity'
import { Logger } from './../common/logger'
import { CommandHandler } from './command.handler'
import { Injectable } from '@nestjs/common'
import {
  Action,
  Help,
  Hears,
  Start,
  Context,
  Command,
  InjectBot,
  TelegrafProvider,
} from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegram-typings'

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

  @Start()
  start(ctx: Context) {
    ctx.reply('Welcome!')
  }

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
    ctx.reply(
      'How would you rate sea condition for swimming?',
      this.rateKeyboard(),
    )
  }

  @Action(/rate[1-4]/)
  async rateAction(ctx: Context) {
    const ratingUser = ctx.update.callback_query.from
    const reply = ctx.update.callback_query.data
    const rate = parseInt(reply.charAt(4))

    await this.commandHandler.rating(ratingUser.id, rate)

    ctx.editMessageText('Got your rating, Thanks!')
  }

  private rateKeyboard() {
    const buttons = [
      ['🥇', 'rate1'],
      ['🥈', 'rate2'],
      ['🥉', 'rate3'],
      ['💩', 'rate4'],
    ].map(button => Markup.callbackButton(button[0], button[1]))

    return Markup.inlineKeyboard(buttons).extra()
  }
}
