import { BotService } from './bot.service'
import { UpdateDTO } from './dto/update.dto'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('bot')
export class BotController {
  constructor(private readonly service: BotService) {}

  @Post('update')
  async update(@Body() data: UpdateDTO) {
    // console.log(data)
    if (!data.message) {
      console.log('MISSING UPDATE MESSAGE!')
      return 'Invalid update'
    }
    // TODO: map to domain object
    return await this.service.handleUpdate(data)
  }
}
