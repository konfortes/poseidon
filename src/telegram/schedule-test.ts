import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class ScheduleTest {
  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    console.log('got scheduled by cron!!! the time is ' + new Date())
  }
}
