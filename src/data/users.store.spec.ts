import { Test, TestingModule } from '@nestjs/testing'
import { UsersStore } from './users.store'

describe('UsersStore', () => {
  let provider: UsersStore

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersStore],
    }).compile()

    provider = module.get<UsersStore>(UsersStore)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
