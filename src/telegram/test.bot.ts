import { Injectable } from '@nestjs/common'
import { Start, Help, On, Hears, Context } from 'nestjs-telegraf'

@Injectable()
export class TestBot {
  @Start()
  start(ctx: Context) {
    ctx.reply('Welcome')
  }

  @Help()
  help(ctx: Context) {
    ctx.reply('Send me a sticker')
  }

  @On('sticker')
  on(ctx: Context) {
    ctx.reply('👍')
  }

  @Hears('hi')
  hears(ctx: Context) {
    ctx.reply('Hey there')
  }
}
