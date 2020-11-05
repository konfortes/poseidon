import { Test, TestingModule } from '@nestjs/testing'
import { CacheService } from './cache.service'

describe('CachingService', () => {
  let cacheService: CacheService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile()

    cacheService = module.get<CacheService>(CacheService)
  })

  it('should be defined', () => {
    expect(cacheService).toBeDefined()
  })

  describe('fetch', () => {
    it('returns the cached value', async () => {
      const mockFn = jest.fn(() => Promise.resolve('x'))

      await cacheService.fetch('key', mockFn, 10)
      await cacheService.fetch('key', mockFn, 10)
      await cacheService.fetch('key', mockFn, 10)

      expect(mockFn.mock.calls.length).toBe(1)
    })
  })
})
