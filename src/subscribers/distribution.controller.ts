import { CommandHandler } from './../telegram/command.handler'
import { Controller, Post } from '@nestjs/common'
import { InjectBot, TelegrafProvider } from 'nestjs-telegraf'
import { Logger } from 'src/common/logger'
import { UsersStore } from 'src/data/users.store'

@Controller('distribution')
export class DistributionController {
  // TODO: move forecast outside of commandHandler
  constructor(
    private readonly commandHandler: CommandHandler,
    @InjectBot() private bot: TelegrafProvider,
    // private readonly logger: Logger,
    private readonly usersStore: UsersStore,
  ) {}
  @Post()
  async send(): Promise<void> {
    const forecastImageBuffer = await this.commandHandler.forecast()
    const subscribedIds = await this.usersStore.getSubscribedUserExternalIds()

    await Promise.all(
      subscribedIds.map(id =>
        this.bot.telegram.sendPhoto(id, { source: forecastImageBuffer }),
      ),
    )
  }
}
