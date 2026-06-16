// ─── Skeletons ────────────────────────────────────────────────

function showSkeletons(count = 12) {
  const grid = document.getElementById('matches-grid');
  grid.innerHTML = '';
  grid.style.transition = '';
  grid.style.opacity = '1';

  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = `
      <div class="skeleton" style="width:60px;height:11px;margin-bottom:14px"></div>
      <div class="skeleton" style="width:85%;height:16px;margin-bottom:8px"></div>
      <div class="skeleton" style="width:60%;height:14px;margin-bottom:20px"></div>
      <div style="display:flex;gap:6px">
        <div class="skeleton" style="width:48px;height:22px;border-radius:4px"></div>
        <div class="skeleton" style="width:48px;height:22px;border-radius:4px"></div>
      </div>
    `;
    grid.appendChild(card);
  }
}

// ─── Nav ──────────────────────────────────────────────────────

function renderNav(categories, activeId, onSelect) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'nav-item' + (cat.id === activeId ? ' active' : '');
    btn.dataset.id = cat.id;
    if (cat.id === activeId) btn.setAttribute('aria-current', 'page');
    btn.innerHTML = `<span class="nav-emoji">${cat.emoji}</span>${cat.label}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(item => {
        const active = item.dataset.id === cat.id;
        item.classList.toggle('active', active);
        active
          ? item.setAttribute('aria-current', 'page')
          : item.removeAttribute('aria-current');
      });
      onSelect(cat.id);
    });
    nav.appendChild(btn);
  });
}

// ─── Section heading ──────────────────────────────────────────

function updateSectionTitle(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  document.getElementById('section-title').textContent =
    cat ? cat.label : 'Live Now';
}

// ─── Live counts ──────────────────────────────────────────────

function updateLiveCounts(count) {
  document.getElementById('live-count-text').textContent =
    count > 0 ? `${count} live` : '— live';
  document.getElementById('topbar-match-count').textContent =
    count > 0 ? `${count} live` : '';

  const badge = document.getElementById('section-badge');
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ─── Empty / error states ─────────────────────────────────────

function showEmptyState() {
  document.getElementById('matches-grid').innerHTML = '';
  document.getElementById('empty-state').classList.remove('hidden');
}

function hideEmptyState() {
  document.getElementById('empty-state').classList.add('hidden');
}

function showStreamError() {
  const overlay = document.getElementById('loading-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <div style="text-align:center;padding:24px">
      <p style="color:var(--text-secondary);font-size:14px;margin-bottom:12px">
        Stream unavailable — try another source
      </p>
      <button onclick="openPlayer(state.match)" style="
        background:transparent;border:1px solid var(--orange);color:var(--orange);
        padding:7px 18px;border-radius:999px;font-size:13px;cursor:pointer;
        font-family:Inter,sans-serif;
      ">Retry</button>
    </div>
  `;
}

// ─── Loading overlay ──────────────────────────────────────────

function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <div class="progress-bar-track">
      <div id="progress-bar" class="progress-bar"></div>
    </div>
    <div class="overlay-logo">
      <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
        <path d="M2 3 L2 25 L24 14 Z" fill="#FC4C02"/>
        <path d="M15 5 L9 14 L13 14 L12 23 L19 14 L15 14 Z" fill="rgba(255,255,255,0.88)"/>
      </svg>
    </div>
  `;
  requestAnimationFrame(() => {
    const pb = document.getElementById('progress-bar');
    if (pb) pb.classList.add('animating');
  });
}

function hideLoadingOverlay() {
  document.getElementById('loading-overlay').classList.add('hidden');
}

// ─── Retry toast ──────────────────────────────────────────────

function showRetryToast(attempt, max) {
  const wrapper = document.querySelector('.iframe-wrapper');
  if (!wrapper) return;
  const old = wrapper.querySelector('.retry-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.className = 'retry-toast';
  toast.textContent = attempt === 'switching'
    ? 'Switching to next source...'
    : `Stream retry ${attempt}/${max}…`;
  wrapper.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ─── Quality badge ────────────────────────────────────────────

function applyQualityBadge(element, hd, className = 'quality-badge') {
  element.className = `${className} ${hd ? 'hd' : 'sd'}`;
  element.textContent = hd ? 'HD' : 'SD';
}

// ─── Keyboard hint ────────────────────────────────────────────

function showKbHint() {
  if (sessionStorage.getItem('kb-hint-shown')) return;
  const hint = document.getElementById('kb-hint');
  hint.classList.remove('hidden');
  sessionStorage.setItem('kb-hint-shown', 'true');
  setTimeout(() => hint.classList.add('hidden'), 4000);
}

// ─── Unmute overlay ───────────────────────────────────────────

function showUnmuteOverlay() {
  document.getElementById('unmute-overlay').classList.remove('hidden');
  if (sessionStorage.getItem('istream-interacted')) {
    setTimeout(hideUnmuteOverlay, 1000);
  }
}

function hideUnmuteOverlay() {
  try {
    const iframe = document.getElementById('stream-iframe');
    iframe.contentWindow.postMessage({ type: 'unmute' }, '*');
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute' }), '*'
    );
  } catch (_) {}
  document.getElementById('unmute-overlay').classList.add('hidden');
  sessionStorage.setItem('istream-interacted', 'true');
}

// ─── Sidebar ──────────────────────────────────────────────────

function toggleSidebar(open) {
  document.getElementById('sidebar').classList.toggle('open', open);
  document.getElementById('sidebar-backdrop').classList.toggle('visible', open);
}

// ─── Ripple ───────────────────────────────────────────────────

function ripple(event, element) {
  const span = document.createElement('span');
  span.className = 'ripple';
  const rect = element.getBoundingClientRect();
  span.style.left = (event.clientX - rect.left) + 'px';
  span.style.top  = (event.clientY - rect.top)  + 'px';
  element.appendChild(span);
  setTimeout(() => span.remove(), 450);
}
