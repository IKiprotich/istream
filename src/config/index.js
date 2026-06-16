module.exports = Object.freeze({
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || '0.0.0.0',
  NODE_ENV: process.env.NODE_ENV || 'development',
  STREAMED_BASE_URL: 'https://streamed.pk',
  PROXY_HEADERS: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://streamed.pk/',
    'Origin': 'https://streamed.pk',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
  },
  VALID_SOURCES: [
    'alpha', 'bravo', 'charlie', 'delta',
    'echo', 'foxtrot', 'golf', 'hotel', 'intel',
  ],
  VALID_CATEGORIES: [
    'football', 'basketball', 'tennis', 'baseball',
    'hockey', 'american-football', 'rugby', 'cricket',
  ],
});
