import { UsersStore } from './../data/users.store'
import { RatingsStore } from './../data/ratings.store'
import { UserEntity } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { CacheService } from '..//common/cache.service'
import { Scraper } from '../scraping/scraper'

@Injectable()
export class CommandHandler {
  MSW_URL = 'https://magicseaweed.com/Hazuk-Beach-Surf-Report/3659/'
  FORECAST_SELECTOR_TODAY =
    '#msw-js-fc > div.table-responsive-xs > table > tbody:nth-child(2)'
  FORECAST_SELECTOR_TOMORROW =
    '#msw-js-fc > div.table-responsive-xs > table > tbody:nth-child(2)'

  constructor(
    private readonly scraper: Scraper,
    private readonly cacheService: CacheService,
    private readonly usersStore: UsersStore,
    private readonly ratingsStore: RatingsStore,
  ) {}

  async forecast(): Promise<string> {
    const getScreenshotFn = async () => {
      return await this.scraper.takeScreenshot(
        this.MSW_URL,
        '#msw-js-fc',
        this.scrapingSelector(),
        { name: 'MSW_unitgroup', value: 'eu', domain: '.magicseaweed.com' },
      )
    }

    return await this.cacheService.fetch('forecast', getScreenshotFn, 60 * 60)
  }

  async subscribe(user: UserEntity): Promise<void> {
    const existingUser = this.usersStore.getByExternalId(user.external_id)

    if (!existingUser) {
      user.subscribed = true
      await this.usersStore.insert(user)

      return
    }

    await this.usersStore.updateSubscription(
      { external_id: user.external_id },
      true,
    )

    return
  }
  async unsubscribe(user: UserEntity): Promise<void> {
    await this.usersStore.updateSubscription(
      { external_id: user.external_id },
      false,
    )
  }

  async rating(user: UserEntity, rating: number): Promise<void> {
    const existingUser = await this.usersStore.getByExternalId(user.external_id)

    let userId
    if (existingUser) {
      userId = existingUser.id
    } else {
      userId = await this.usersStore.insert(user)
    }

    await this.ratingsStore.insert(userId, rating)
  }

  private scrapingSelector(): string {
    const now = new Date()
    console.log(`#scrapingSelector now.getHours(): ${now.getHours()}`)

    return now.getHours() > 12
      ? this.FORECAST_SELECTOR_TOMORROW
      : this.FORECAST_SELECTOR_TODAY
  }
}
