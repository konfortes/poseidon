import { BotModule } from './bot/bot.module'
import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'

@Module({
  imports: [HealthModule, BotModule],
})
export class AppModule {}
