import { BotModule } from './bot/bot.module'
import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'

@Module({
  imports: [CommonModule, BotModule],
})
export class AppModule {}
