import { UserEntity } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { CacheService } from '..//common/cache.service'
import { Scraper } from '../scraping/scraper'
import { InjectKnex, Knex } from 'nestjs-knex'

@Injectable()
export class CommandHandler {
  MSW_URL = 'https://magicseaweed.com/Hazuk-Beach-Surf-Report/3659/'
  FORECAST_SELECTOR =
    '#msw-js-fc > div.table-responsive-xs > table > tbody:nth-child(2)'
  constructor(
    private readonly scraper: Scraper,
    private readonly cacheService: CacheService,
    @InjectKnex() private readonly knex: Knex,
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

  async subscribe(user: UserEntity): Promise<void> {
    const existingUser = await this.knex<UserEntity>('users')
      .where('external_id', user.external_id)
      .first()

    if (!existingUser) {
      return await this.knex('users').insert(user)
    }

    await this.knex('users')
      .where('external_id', existingUser.external_id)
      .update({ subscribed: true })

    return
  }
  async unsubscribe(user: UserEntity): Promise<void> {
    await this.knex('users')
      .where('external_id', user.external_id)
      .update({ subscribed: false })
  }

  async rating(externalUserId: number, rate: number): Promise<void> {}
}
