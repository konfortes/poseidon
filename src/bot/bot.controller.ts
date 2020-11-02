import { BotService } from './bot.service'
import { UpdateDTO } from './dto/update.dto'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('bot')
export class BotController {
  constructor(private readonly service: BotService) {}

  @Post('update')
  update(@Body() data: UpdateDTO) {
    // console.log(data)

    switch (data.message.text) {
      case '/subscribe':
        this.service.subscribe()
        break

      default:
        console.log('UNKNOWN UPDATE COMMAND')
        break
    }
  }
}
