import { Injectable } from '@nestjs/common'

interface CacheEntry {
  value: string
  createdAt: Date
  ttl: number
}

@Injectable()
export class CacheService {
  private store: Map<string, CacheEntry> = new Map<string, CacheEntry>()

  async fetch(
    key: string,
    fn: () => string,
    ttl: number = 5 * 60,
  ): Promise<string> {
    const fromCache = this.store.get(key)

    if (fromCache && !this.shouldInvalidate(fromCache)) {
      return fromCache.value
    }

    const computed = await fn()
    const newEntry: CacheEntry = {
      value: computed,
      createdAt: new Date(),
      ttl,
    }

    this.store.set(key, newEntry)

    return computed
  }

  private shouldInvalidate(entry: CacheEntry) {
    const now = new Date().getTime()
    const withTtl = entry.createdAt.getTime() + entry.ttl

    return withTtl < now
  }
}
