import { Test, TestingModule } from '@nestjs/testing'
import { CachingService } from './caching.service'

describe('CachingService', () => {
  let cacheService: CachingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CachingService],
    }).compile()

    cacheService = module.get<CachingService>(CachingService)
  })

  it('should be defined', () => {
    expect(cacheService).toBeDefined()
  })

  describe('fetch', () => {
    it('returns the cached value', async () => {
      const mockFn = jest.fn(() => 'x')

      await cacheService.fetch('key', mockFn, 10)
      await cacheService.fetch('key', mockFn, 10)
      await cacheService.fetch('key', mockFn, 10)

      expect(mockFn.mock.calls.length).toBe(1)
    })
  })
})
