import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { TelegramModule } from './telegram/telegram.module'
import { ScrapingModule } from './scraping/scraping.module'
import { DataModule } from './data/data.module'

@Module({
  imports: [CommonModule, TelegramModule, ScrapingModule],
})
export class AppModule {}
