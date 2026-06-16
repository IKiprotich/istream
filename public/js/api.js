async function fetchLiveMatches() {
  const res = await fetch('/api/matches/live');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchMatchesByCategory(category) {
  const res = await fetch(`/api/matches/${category}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchStreams(source, id) {
  const res = await fetch(`/api/stream/${source}/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchAllStreams(sources) {
  const results = await Promise.allSettled(
    sources.map(s =>
      fetchStreams(s.source, s.id)
        .then(streams =>
          (Array.isArray(streams) ? streams : []).map(st => ({
            ...st,
            source: s.source,
          }))
        )
    )
  );
  return results
    .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
    .flatMap(r => r.value);
}
