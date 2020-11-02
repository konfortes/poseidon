import { Injectable } from '@nestjs/common'

@Injectable()
export class BotService {
  subscribe(userId: number, username: string) {
    console.log(`subscribing user(id: ${userId}, username: ${username})!`)
  }
  unsubscribe(userId: number, username: string) {
    console.log(`unsubscribing user(id: ${userId}, username: ${username})!`)
  }
  forecast(userId: number) {
    console.log(`sending forecast to ${userId}`)
  }
}
