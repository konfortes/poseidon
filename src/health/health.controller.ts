import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthController {
  @Get()
  alive() {
    return 'OK'
  }
}
