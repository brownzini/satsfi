import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server';

export function rateLimit(options = { uniqueTokenPerInterval: 500, interval: 60000 }) {
  const tokenCache = new LRUCache<string, number>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (res: any, limit: number, token: string) => {
      const tokenCount = tokenCache.get(token) || 0;
      if (tokenCount >= limit) {
         res.json({ msg: "Too many requests" }, { status: 429 });
      }
      tokenCache.set(token, tokenCount + 1);
    },
  };
}
