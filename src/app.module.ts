import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { TelegramModule } from './telegram/telegram.module'

@Module({
  imports: [CommonModule, TelegramModule],
})
export class AppModule {}
