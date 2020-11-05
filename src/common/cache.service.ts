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
    fn: () => Promise<any>,
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
    const currentTime = new Date().getTime()
    const entryTime = entry.createdAt.getTime()

    return entryTime + entry.ttl * 1000 < currentTime
  }
}
