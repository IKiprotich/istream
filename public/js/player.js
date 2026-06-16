// ─── Open player ──────────────────────────────────────────────

function openPlayer(match) {
  state.match    = match;
  state.streamIndex = 0;
  state.streams  = [];

  const panel    = document.getElementById('player-panel');
  const playerBar = document.getElementById('player-bar');

  document.getElementById('player-title').textContent = match.title;
  document.getElementById('bar-match-title').textContent = match.title;
  document.getElementById('bar-sport-badge').textContent =
    (match.category || 'Sport').toUpperCase();

  if (!state.playerOpen) {
    panel.classList.remove('hidden', 'closing');
    state.playerOpen = true;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  showLoadingOverlay();
  document.getElementById('quality-badge').className = 'quality-badge hidden';
  document.getElementById('stream-iframe').src = '';

  playerBar.classList.remove('hidden', 'leaving');
  playerBar.classList.add('entering');

  showKbHint();

  loadAllStreams(match.sources || []);
}

// ─── Close player ─────────────────────────────────────────────

function closePlayer() {
  const panel    = document.getElementById('player-panel');
  const playerBar = document.getElementById('player-bar');

  panel.classList.add('closing');
  playerBar.classList.remove('entering');
  playerBar.classList.add('leaving');

  document.getElementById('stream-iframe').src = '';
  hideUnmuteOverlay();
  clearWatchdog();

  if (state.hideOverlayTimer) {
    clearTimeout(state.hideOverlayTimer);
    state.hideOverlayTimer = null;
  }

  setTimeout(() => {
    panel.classList.add('hidden');
    panel.classList.remove('closing');
    playerBar.classList.add('hidden');
    playerBar.classList.remove('leaving');
  }, 320);

  state.playerOpen  = false;
  state.match       = null;
  state.streams     = [];
  state.streamIndex = 0;
}

// ─── Fullscreen ───────────────────────────────────────────────

function toggleFullscreen() {
  const wrapper = document.querySelector('.iframe-wrapper');
  const isFs = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement
  );
  if (!isFs) {
    if (wrapper.requestFullscreen)            wrapper.requestFullscreen();
    else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
    else if (wrapper.mozRequestFullScreen)    wrapper.mozRequestFullScreen();
  } else {
    if (document.exitFullscreen)            document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
  }
}

function onFullscreenChange() {
  // Reserved for any fullscreen icon sync if added later
}
