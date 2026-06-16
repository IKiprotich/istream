const fetch = require('node-fetch');
const config = require('../config');

async function fetchFromStreamed(path) {
  const url = `${config.STREAMED_BASE_URL}${path}`;
  const res = await fetch(url, { headers: config.PROXY_HEADERS });
  if (!res.ok) {
    const err = new Error(`Streamed API error: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

module.exports = {
  getLiveMatches: () =>
    fetchFromStreamed('/api/matches/live'),

  getMatchesByCategory: (category) =>
    fetchFromStreamed(`/api/matches/${category}`),

  getStreams: (source, id) =>
    fetchFromStreamed(`/api/stream/${source}/${id}`),
};
