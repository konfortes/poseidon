import { Module } from '@nestjs/common'
import { Scraper } from './scraper'

@Module({
  providers: [Scraper],
  exports: [Scraper],
})
export class ScrapingModule {}
