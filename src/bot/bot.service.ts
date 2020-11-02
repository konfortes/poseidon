import { Injectable } from '@nestjs/common'

@Injectable()
export class BotService {
  subscribe(userId: number, name: string) {
    console.log(`subscribing user(id: ${userId}, name: ${name})!`)
  }
  unsubscribe(userId: number, name: string) {
    console.log(`unsubscribing user(id: ${userId}, name: ${name})!`)
  }
  forecast(userId: number) {
    console.log(`sending forecast to ${userId}`)
  }
}
