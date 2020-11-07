import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import { SetCookie } from 'puppeteer'
import { Logger } from '../common/logger'

@Injectable()
export class Scraper {
  constructor(private readonly logger: Logger) {}
  async takeScreenshot(
    url: string,
    waitForSelector: string,
    elementSelector: string,
    ...cookies: SetCookie[]
  ): Promise<Buffer> {
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

      for (const cookie of cookies) {
        await page.setCookie(cookie)
      }

      page.setViewport({ width: 1400, height: 700, deviceScaleFactor: 2 })

      await page.goto(url)
      await page.waitForSelector(waitForSelector, {
        timeout: 10000,
      })

      const element = await page.$(elementSelector)

      return await element.screenshot({ encoding: 'binary' })
    } catch (ex) {
      this.logger.error(ex)
    } finally {
      await browser.close()
    }
  }
}
