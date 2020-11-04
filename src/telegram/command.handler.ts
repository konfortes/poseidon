import { Injectable } from '@nestjs/common'
import { Help, Hears, Context, Command } from 'nestjs-telegraf'

@Injectable()
export class CommandHandler {
  supportedCommands = []

  @Help()
  help(ctx: Context) {
    ctx.reply("Please type '/' to see available commands")
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
  forecast(ctx: Context) {
    ctx.reply("here is tomorrow's forecast")
  }

  @Hears('hi')
  hears(ctx: Context) {
    ctx.reply('Hey there')
  }
}
