// ─── Select best stream ───────────────────────────────────────

function selectBestStream(streams) {
  const hdStreams = streams.filter(s => s.hd === true);
  if (hdStreams.length > 0) {
    const best = hdStreams.sort(
      (a, b) => (b.streamNo || 0) - (a.streamNo || 0)
    )[0];
    return streams.indexOf(best);
  }
  return 0;
}

// ─── Load all streams ─────────────────────────────────────────

async function loadAllStreams(sources) {
  state.streams = await fetchAllStreams(sources);

  if (state.streams.length === 0) {
    showStreamError();
    return;
  }

  loadStream(selectBestStream(state.streams));
}

// ─── Load single stream ───────────────────────────────────────

function loadStream(index) {
  state.streamIndex = index;
  const stream = state.streams[index];

  const iframe = document.getElementById('stream-iframe');
  iframe.style.opacity = '0.3';

  showLoadingOverlay();
  document.getElementById('quality-badge').className = 'quality-badge hidden';

  iframe.src = '';
  setTimeout(() => {
    iframe.src = stream.embedUrl;
    iframe.style.opacity = '1';
    startWatchdog(index);
    scheduleUnmute();
  }, 60);

  if (state.hideOverlayTimer) clearTimeout(state.hideOverlayTimer);
  state.hideOverlayTimer = setTimeout(() => {
    hideLoadingOverlay();
    applyQualityBadge(
      document.getElementById('quality-badge'),
      stream.hd
    );
  }, STREAM_LOAD_TIMEOUT_MS);

  // Update player bar
  applyQualityBadge(document.getElementById('bar-quality'), stream.hd, 'q-badge');
  document.getElementById('bar-language').textContent = stream.language || '';
  document.getElementById('bar-source').textContent =
    (stream.source || 'UNKNOWN').toUpperCase();
  document.getElementById('bar-stream-counter').textContent =
    `${index + 1} / ${state.streams.length}`;

  document.getElementById('prev-stream').disabled = index === 0;
  document.getElementById('next-stream').disabled = index === state.streams.length - 1;
}

// ─── Navigate ─────────────────────────────────────────────────

function navigateStream(dir) {
  const next = Math.max(
    0,
    Math.min(state.streams.length - 1, state.streamIndex + dir)
  );
  if (next !== state.streamIndex) loadStream(next);
}

// ─── Watchdog ─────────────────────────────────────────────────

function startWatchdog(index) {
  clearWatchdog();
  state.currentStreamStartTime = Date.now();
  state.retryCount = 0;
  state.watchdogTimer = setTimeout(
    () => checkStreamHealth(index),
    WATCHDOG_INITIAL_MS
  );
}

function checkStreamHealth(index) {
  const iframe = document.getElementById('stream-iframe');
  const srcEmpty =
    !iframe.src ||
    iframe.src === 'about:blank' ||
    iframe.src === window.location.href;

  if (srcEmpty && state.retryCount < MAX_RETRIES) {
    console.log(
      `[iStream] Stream appears dead. Retry ${state.retryCount + 1}/${MAX_RETRIES}...`
    );
    retryStream(index);
    return;
  }

  if (!srcEmpty) {
    state.watchdogTimer = setTimeout(
      () => checkStreamHealth(index),
      WATCHDOG_INTERVAL_MS
    );
  }
}

function retryStream(index) {
  state.retryCount++;
  const iframe = document.getElementById('stream-iframe');

  if (state.retryCount < MAX_RETRIES) {
    showRetryToast(state.retryCount, MAX_RETRIES);
    iframe.src = '';
    setTimeout(() => {
      const stream = state.streams[index];
      if (stream) {
        iframe.src = stream.embedUrl;
        scheduleUnmute();
        state.watchdogTimer = setTimeout(
          () => checkStreamHealth(index),
          WATCHDOG_INITIAL_MS
        );
      }
    }, 500);
  } else {
    console.log('[iStream] Max retries reached, trying next source...');
    clearWatchdog();
    const nextIndex = index + 1;
    if (nextIndex < state.streams.length) {
      showRetryToast('switching', null);
      setTimeout(() => loadStream(nextIndex), 1000);
    } else {
      showStreamError();
    }
  }
}

function clearWatchdog() {
  if (state.watchdogTimer) {
    clearTimeout(state.watchdogTimer);
    state.watchdogTimer = null;
  }
}

// ─── Unmute ───────────────────────────────────────────────────

function scheduleUnmute() {
  const iframe = document.getElementById('stream-iframe');
  setTimeout(() => {
    try {
      iframe.contentWindow.postMessage({ type: 'unmute' }, '*');
      iframe.contentWindow.postMessage(
        { type: 'command', command: 'unmute' }, '*'
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute' }), '*'
      );
    } catch (_) {}
    showUnmuteOverlay();
  }, STREAM_LOAD_TIMEOUT_MS);
}
