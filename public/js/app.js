function init() {
  renderNav(CATEGORIES, state.category, (id) => {
    state.category = id;
    loadMatches();
  });

  loadMatches();
  setInterval(loadMatches, REFRESH_INTERVAL_MS);

  document.getElementById('close-player')
    .addEventListener('click', closePlayer);
  document.getElementById('bar-close')
    .addEventListener('click', closePlayer);

  document.getElementById('fs-btn')
    .addEventListener('click', toggleFullscreen);
  document.getElementById('fs-center-btn')
    .addEventListener('click', toggleFullscreen);

  document.getElementById('prev-stream')
    .addEventListener('click', () => navigateStream(-1));
  document.getElementById('next-stream')
    .addEventListener('click', () => navigateStream(+1));

  document.getElementById('unmute-btn')
    .addEventListener('click', hideUnmuteOverlay);

  document.getElementById('empty-refresh')
    .addEventListener('click', loadMatches);

  document.getElementById('hamburger').addEventListener('click', () => {
    state.sidebarOpen = !state.sidebarOpen;
    toggleSidebar(state.sidebarOpen);
  });

  document.getElementById('sidebar-backdrop').addEventListener('click', () => {
    state.sidebarOpen = false;
    toggleSidebar(false);
  });

  document.addEventListener('keydown', e => {
    if (!state.playerOpen) return;
    if (e.key === 'ArrowRight') navigateStream(+1);
    if (e.key === 'ArrowLeft')  navigateStream(-1);
    if (e.key === 'Escape')     closePlayer();
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
  });

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
}

document.addEventListener('DOMContentLoaded', init);
