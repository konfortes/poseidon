import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf/dist/telegraf.module'
import { BotController } from './bot.controller'
import { TestBot } from './test.bot'
import { WebhookHandler } from './webhook.handler'

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('telegram.botToken'),
        launchOptions: {
          webhook: {
            domain: configService.get<string>('telegram.webhook.domain'),
            hookPath: '/bot/update',
            //     host: '0.0.0.0',
            //     hookPath: '/' + configService.get<string>('telegram.webhook.secretPath') + '/update',
            //     port: configService.get('port'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  // controllers: [BotController],
  providers: [WebhookHandler, TestBot],
})
export class TelegramModule {}
