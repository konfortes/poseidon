import { BotService } from './bot.service'
import { UpdateDTO } from './dto/update.dto'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('bot')
export class BotController {
  constructor(private readonly service: BotService) {}

  fullName = user => [user.first_name, user.last_name].join(' ')

  @Post('update')
  update(@Body() data: UpdateDTO) {
    console.log(data)
    if (!data.message) {
      console.log('MISSING UPDATE MESSAGE!')
      return
    }

    const message = data.message

    switch (message.text) {
      case '/subscribe':
        this.service.subscribe(message.from.id, this.fullName(message.from))
        break
      case '/unsubscribe':
        this.service.unsubscribe(message.from.id, this.fullName(message.from))
        break
      case '/forecast':
        this.service.forecast(message.from.id)
        break

      default:
        console.log(`UNKNOWN UPDATE COMMAND: ${message.text}`)
        break
    }
  }
}
