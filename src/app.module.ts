import { BotModule } from './bot/bot.module'
import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [HealthModule, CommonModule, BotModule],
})
export class AppModule {}
