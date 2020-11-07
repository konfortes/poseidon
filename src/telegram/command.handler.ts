import { Injectable } from '@nestjs/common'
import { CacheService } from '..//common/cache.service'
import { Scraper } from '../scraping/scraper'

@Injectable()
export class CommandHandler {
  MSW_URL = 'https://magicseaweed.com/Hazuk-Beach-Surf-Report/3659/'
  FORECAST_SELECTOR =
    '#msw-js-fc > div.table-responsive-xs > table > tbody:nth-child(2)'
  constructor(
    private readonly scraper: Scraper,
    private readonly cacheService: CacheService,
  ) {}
  async forecast(): Promise<string> {
    const getScreenshotFn = async () => {
      return await this.scraper.takeScreenshot(
        this.MSW_URL,
        '#msw-js-fc',
        this.FORECAST_SELECTOR,
        { name: 'MSW_unitgroup', value: 'eu', domain: '.magicseaweed.com' },
      )
    }

    return await this.cacheService.fetch('forecast', getScreenshotFn, 60 * 60)
  }

  rateKeyboard() {
    // TODO: memoize
    return {
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
}
