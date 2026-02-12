// In-memory store to track request counts per client
// Key   → IP address
// Value → { count: number, startTime: window start timestamp }
const requests = new Map();

// Time window for rate limiting (default: 1 minute)
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;

// Maximum allowed requests per window
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 100;

// Rate limiting middleware
export const RateLimter = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();

  // First request from this client
  if (!requests.has(key)) {
    requests.set(key, { count: 1, startTime: now });
    return next();
  }

  const userData = requests.get(key);

  // Reset counter if time window has expired
  if (now - userData.startTime > WINDOW_MS) {
    userData.count = 1;
    userData.startTime = now;
    return next();
  }

  // Client has exceeded the allowed number of requests
  if (userData.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil(
      (WINDOW_MS - (now - userData.startTime)) / 1000
    );

    res.set({
      "X-RateLimit-Limit": MAX_REQUESTS,
      "X-RateLimit-Remaining": 0,
      "Retry-After": retryAfter,
    });

    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  // Increment request count
  userData.count += 1;

  res.set({
    "X-RateLimit-Limit": MAX_REQUESTS,
    "X-RateLimit-Remaining": MAX_REQUESTS - userData.count,
  });
  next();
};
