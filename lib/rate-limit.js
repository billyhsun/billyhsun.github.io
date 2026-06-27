const rateLimitStore = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 20;

function getClientIp(req) {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
        return String(forwarded).split(",")[0].trim();
    }
    return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function checkRateLimit(req) {
    const ip = getClientIp(req);
    const now = Date.now();
    let entry = rateLimitStore.get(ip);

    if (!entry || now - entry.windowStart > WINDOW_MS) {
        entry = { windowStart: now, count: 0 };
    }

    entry.count += 1;
    rateLimitStore.set(ip, entry);

    if (rateLimitStore.size > 5000) {
        for (const [key, val] of rateLimitStore) {
            if (now - val.windowStart > WINDOW_MS) rateLimitStore.delete(key);
        }
    }

    return {
        allowed: entry.count <= MAX_REQUESTS,
        remaining: Math.max(0, MAX_REQUESTS - entry.count),
        ip,
    };
}

module.exports = { checkRateLimit, MAX_REQUESTS };
