import { TelegramModule } from './../telegram/telegram.module'
import { Module } from '@nestjs/common'
import { DistributionController } from './distribution.controller'
import { DataModule } from 'src/data/data.module'

@Module({
  imports: [DataModule, TelegramModule],
  controllers: [DistributionController],
})
export class SubscribersModule {}
