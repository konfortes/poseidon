import { CommonModule } from './../common/common.module'
import { DataModule } from './data.module'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersStore } from './users.store'

describe('UsersStore', () => {
  let provider: UsersStore

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, DataModule],
      providers: [UsersStore],
    }).compile()

    provider = module.get<UsersStore>(UsersStore)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
