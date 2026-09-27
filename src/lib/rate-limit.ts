export class RateLimiter {
  private limit: number;
  private windowMs: number;
  private requests: Map<string, { count: number; resetTime: number }>;

  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  check(key: string): { success: boolean; remaining: number; reset: number } {
    const now = Date.now();

    // Clean up expired entries
    this.requests.forEach((v, k) => {
      if (now > v.resetTime) {
        this.requests.delete(k);
      }
    });

    const entry = this.requests.get(key) || { count: 0, resetTime: now + this.windowMs };

    if (now > entry.resetTime) {
      entry.count = 0;
      entry.resetTime = now + this.windowMs;
    }

    entry.count++;
    this.requests.set(key, entry);

    const remaining = Math.max(0, this.limit - entry.count);
    const success = entry.count <= this.limit;

    return { success, remaining, reset: entry.resetTime };
  }
}

// Helper for API routes
export function rateLimit(options: { interval: number; max: number }) {
  const limiter = new RateLimiter(options.max, options.interval * 1000);

  return {
    check(request: Request): { success: boolean } {
      const ip = request.headers.get('x-forwarded-for') || 'unknown';
      const result = limiter.check(ip);
      return { success: result.success };
    },
  };
}

const rateLimiter = new RateLimiter(5, 60000);
export default rateLimiter;
