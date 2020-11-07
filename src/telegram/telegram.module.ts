import { CommandHandler } from './command.handler'
import { ScrapingModule } from './../scraping/scraping.module'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf/dist/telegraf.module'
import { CommandReceiver } from './command.receiver'

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        token: config.get<string>('telegram.botToken'),
        launchOptions: {
          webhook: {
            domain: config.get<string>('telegram.webhook.domain'),
            hookPath: config.get<string>('telegram.webhook.secretPath'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ScrapingModule,
  ],
  providers: [CommandReceiver, CommandHandler],
})
export class TelegramModule {}
