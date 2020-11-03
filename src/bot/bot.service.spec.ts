import { CommonModule } from './../common/common.module'
import { Logger } from '../common/logger'
import { Test, TestingModule } from '@nestjs/testing'
import { BotService } from './bot.service'

describe('BotService', () => {
  let service: BotService

  const loggerStub = {
    log: (msg: string) => msg,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [BotService],
    })
      // .overrideProvider(Logger)
      // .useClass(loggerStub)
      .compile()

    service = module.get<BotService>(BotService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // describe('unknown command', () => {
  //   it('should do nothing and log a warning', async () => {
  //     const data: any = { message: { text: '/unknown' } }
  //     expect(loggerStub.log).toHaveBeenCalledWith('UNKNOWN UPDATE COMMAND')
  //     service.handleUpdate(data)
  //   })
  // })
})
