import { DataModule } from './../data/data.module'
import { CommonModule } from './../common/common.module'
import { Test, TestingModule } from '@nestjs/testing'
import { DistributionController } from './distribution.controller'
import { TelegramModule } from '../telegram/telegram.module'

describe('DistributionController', () => {
  let controller: DistributionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, TelegramModule, DataModule],
      controllers: [DistributionController],
    }).compile()

    controller = module.get<DistributionController>(DistributionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
