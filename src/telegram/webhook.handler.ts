import { Logger } from '../common/logger'
import { Injectable } from '@nestjs/common'
import { UpdateDTO } from './dto/update.dto'

@Injectable()
export class WebhookHandler {
  SUBSCRIBE = '/subscribe'
  UNSUBSCRIBE = '/unsubscribe'
  FORECAST = '/forecast'
  constructor(private readonly logger: Logger) {}
  handleUpdate(data: UpdateDTO) {
    const message = data.message

    const fullName = user => [user.first_name, user.last_name].join(' ')

    switch (message.text) {
      case this.SUBSCRIBE:
        this.subscribe(message.from.id, fullName(message.from))
        break
      case this.UNSUBSCRIBE:
        this.unsubscribe(message.from.id, fullName(message.from))
        break
      case this.FORECAST:
        this.forecast(message.from.id)
        break

      default:
        this.logger.log(`UNKNOWN UPDATE COMMAND: ${message.text}`)
        break
    }
  }
  private subscribe(userId: number, name: string) {
    console.log(`subscribing user(id: ${userId}, name: ${name})!`)
  }
  private unsubscribe(userId: number, name: string) {
    console.log(`unsubscribing user(id: ${userId}, name: ${name})!`)
  }
  private forecast(userId: number) {
    console.log(`sending forecast to ${userId}`)
  }
}
