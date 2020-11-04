import { CommonModule } from '../common/common.module'
import { Logger } from '../common/logger'
import { Test, TestingModule } from '@nestjs/testing'
import { WebhookHandler } from './webhook.handler'

describe('WebhookHandler', () => {
  let service: WebhookHandler

  const loggerStub = {
    log: (msg: string) => msg,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [WebhookHandler],
    })
      // .overrideProvider(Logger)
      // .useClass(loggerStub)
      .compile()

    service = module.get<WebhookHandler>(WebhookHandler)
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
