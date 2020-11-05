import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import { Logger } from 'src/common/logger'

@Injectable()
export class Scraper {
  constructor(private readonly logger: Logger) {}
  async takeScreenshot(
    url: string,
    waitForSelector: string,
    elementSelector: string,
  ): Promise<string> {
    // TODO: cache
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

      await page.goto(url)
      await page.waitForSelector(waitForSelector, {
        timeout: 10000,
      })

      const element = await page.$(elementSelector)

      return await element.screenshot()
    } catch (ex) {
      this.logger.error(ex)
    } finally {
      await browser.close()
    }
  }
}
