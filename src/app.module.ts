import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { TelegramModule } from './telegram/telegram.module'
import { Test } from './test';

@Module({
  imports: [CommonModule, TelegramModule],
  providers: [Test],
})
export class AppModule {}
