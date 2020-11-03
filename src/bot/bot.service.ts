import { UpdateDTO } from './dto/update.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BotService {
  handleUpdate(data: UpdateDTO) {
    const message = data.message

    const fullName = user => [user.first_name, user.last_name].join(' ')

    switch (message.text) {
      case '/subscribe':
        this.subscribe(message.from.id, fullName(message.from))
        break
      case '/unsubscribe':
        this.unsubscribe(message.from.id, fullName(message.from))
        break
      case '/forecast':
        this.forecast(message.from.id)
        break

      default:
        console.log(`UNKNOWN UPDATE COMMAND: ${message.text}`)
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
