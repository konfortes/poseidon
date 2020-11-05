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

import * as puppeteer from 'puppeteer'

@Injectable()
export class CommandHandler {
  constructor(@InjectBot() private bot: TelegrafProvider) {
    this.bot.use(async (ctx, next) => {
      ctx.reply('', Markup.removeKeyboard().extra())
      await next()
    })
  }

  SUBSCRIBE = 'subscribe'
  UNSUBSCRIBE = 'unsubscribe'
  FORECAST = 'forecast'
  RATE = 'rate'
  MSW_URL = 'https://magicseaweed.com/Hazuk-Beach-Surf-Report/3659/'

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
  }

  @Command('forecast')
  async forecast(ctx: Context) {
    // TODO: cache
    // TODO: move to another service
    const browser = await puppeteer.launch({
      // headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    })
    try {
      const page = await browser.newPage()
      page.setViewport({ width: 1400, height: 700, deviceScaleFactor: 2 })

      await page.goto('https://magicseaweed.com/Hazuk-Beach-Surf-Report/3659/')
      await page.waitForSelector('#msw-js-fc', {
        timeout: 10000,
      })

      const element = await page.$(
        '#msw-js-fc > div.table-responsive-xs > table > tbody:nth-child(2)',
      )
      const screenshotBuffer = await element.screenshot()
      await ctx.replyWithPhoto({ source: screenshotBuffer })
    } catch (ex) {
      console.error(ex)
    } finally {
      await browser.close()
    }
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
          { text: '1' },
          { text: '2' },
          { text: '3' },
          { text: '4' },
          { text: '5' },
        ],
      ],
      one_time_keyboard: true,
      // resizeKeyboard: true,
    }
  }
}
