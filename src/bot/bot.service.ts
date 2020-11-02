import { Injectable } from '@nestjs/common'

@Injectable()
export class BotService {
  subscribe() {
    console.log('subscribing!')
  }
}
