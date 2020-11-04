import { CommonModule } from '../common/common.module'
import { UpdateDTO } from './dto/update.dto'
import { WebhookHandler } from './webhook.handler'
import { Test, TestingModule } from '@nestjs/testing'
import { BotController } from './bot.controller'

describe('BotController', () => {
  let controller: BotController
  const mockBotService = {
    handleUpdate: async (update: UpdateDTO) => 'success',
  }

  const updateDTO: UpdateDTO = {
    update_id: 1,
    message: {
      message_id: 1,
      date: 1,
      text: '',
      from: {
        id: 1,
        is_bot: false,
        first_name: 'John',
        last_name: 'Doe',
      },
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [BotController],
      providers: [WebhookHandler],
    })
      .overrideProvider(WebhookHandler)
      .useValue(mockBotService)
      .compile()

    controller = module.get<BotController>(BotController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return Invalid update on corrupted message', async () => {
    const update: any = {}
    expect(await controller.update(update)).toStrictEqual('Invalid update')
  })

  it('should handle update', async () => {
    expect(await controller.update(updateDTO)).toStrictEqual('success')
  })
})
