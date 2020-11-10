import { ConfigService } from '@nestjs/config'
import { CommandHandler } from './../telegram/command.handler'
import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common'
import { InjectBot, TelegrafProvider } from 'nestjs-telegraf'
import { Logger } from 'src/common/logger'
import { UsersStore } from '../data/users.store'
import { Request } from 'express'

@Controller('distribution')
export class DistributionController {
  // TODO: move forecast outside of commandHandler
  constructor(
    private readonly commandHandler: CommandHandler,
    @InjectBot() private bot: TelegrafProvider,
    private readonly logger: Logger,
    private readonly usersStore: UsersStore,
    private readonly config: ConfigService,
  ) {}
  @Post()
  async send(@Req() request: Request): Promise<void> {
    // TODO: move to middleware
    const authHeader = request.headers['authorization']

    const apiToken = this.config.get<string>('apiToken')
    if (authHeader != `Basic ${apiToken}`) {
      throw new UnauthorizedException()
    }

    try {
      const forecastImageBuffer = await this.commandHandler.forecast()
      const subscribedIds = await this.usersStore.getSubscribedUserExternalIds()

      this.logger.log('distributing forecast!')
      await Promise.all(
        subscribedIds.map(id =>
          this.bot.telegram.sendPhoto(id, { source: forecastImageBuffer }),
        ),
      )
    } catch (ex) {
      this.logger.error(`error while distributing forecast: ${ex}`)
    }
  }
}
