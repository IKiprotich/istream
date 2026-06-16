// ─── Load matches ─────────────────────────────────────────────

async function loadMatches() {
  if (state.loading) return;
  state.loading = true;

  hideEmptyState();
  updateSectionTitle(state.category);
  showSkeletons(12);

  const url = state.category === 'live'
    ? '/api/matches/live'
    : `/api/matches/${state.category}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      showEmptyState();
      updateLiveCounts(0);
    } else {
      renderMatches(data);
      updateLiveCounts(data.length);
    }
  } catch (_) {
    showEmptyState();
    updateLiveCounts(0);
  } finally {
    state.loading = false;
  }
}

// ─── Render matches ───────────────────────────────────────────

function renderMatches(matches) {
  const grid = document.getElementById('matches-grid');

  grid.style.transition = 'opacity 150ms';
  grid.style.opacity = '0';

  setTimeout(() => {
    grid.innerHTML = '';
    grid.style.transition = '';
    grid.style.opacity = '1';
    matches.forEach((match, index) => {
      grid.appendChild(renderCard(match, index));
    });
  }, 150);
}

// ─── Render single card ───────────────────────────────────────

function renderCard(match, index) {
  const card = document.createElement('div');
  card.className = 'match-card';
  card.style.setProperty('--i', index);

  const sources = match.sources || [];
  card.innerHTML = `
    <div class="card-sport">${match.category || 'Sport'}</div>
    <div class="card-title">${match.title}</div>
    <div class="card-footer">
      <div class="sources-row">
        ${sources.map(s => `<span class="source-chip">${s.source}</span>`).join('')}
      </div>
      <div class="live-dot"></div>
    </div>
  `;

  card.addEventListener('mousedown', e => ripple(e, card));
  card.addEventListener('click', () => openPlayer(match));
  return card;
}
