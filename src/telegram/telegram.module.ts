import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf/dist/telegraf.module'
import { CommandHandler } from './command.handler'
import { WebhookHandler } from './webhook.handler'

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        token: config.get<string>('telegram.botToken'),
        launchOptions: {
          webhook: {
            domain: config.get<string>('telegram.webhook.domain'),
            hookPath: config.get('telegram.webhook.secretPath'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [WebhookHandler, CommandHandler],
})
export class TelegramModule {}
