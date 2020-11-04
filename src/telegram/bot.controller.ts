import { Logger } from '../common/logger'
import { Controller, Post, Body } from '@nestjs/common'
import { WebhookHandler } from './webhook.handler'
import { UpdateDTO } from './dto/update.dto'

@Controller('bot')
export class BotController {
  constructor(
    private readonly service: WebhookHandler,
    private readonly logger: Logger,
  ) {}

  @Post('update')
  async update(@Body() data: UpdateDTO) {
    // logger.log(data)
    if (!data.message) {
      this.logger.log('MISSING UPDATE MESSAGE!')

      return 'Invalid update'
    }
    // TODO: map to domain object
    return await this.service.handleUpdate(data)
  }
}
