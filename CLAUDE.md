# iStream

Sports streaming proxy app. Strava color language, Spotify-level UX.

## Commands
- `npm run dev` — nodemon src/server.js, port 3000
- `npm start`   — node src/server.js

## Architecture

```
src/
  config/index.js          — all constants (URLs, headers, valid enums)
  services/streamed.service.js — raw HTTP calls to streamed.pk API
  controllers/
    matches.controller.js  — /api/matches/* handlers
    streams.controller.js  — /api/stream/* handlers
  routes/
    index.js               — mounts /matches and /stream routers + /health
    matches.routes.js
    streams.routes.js
  middleware/
    requestLogger.js       — colored console logging
    errorHandler.js        — 4-arg Express error handler
  app.js                   — Express app (no listen)
  server.js                — calls app.listen

public/
  css/style.css            — all iStream styles
  js/
    constants.js  — CATEGORIES, timing constants (load first)
    state.js      — shared mutable state object
    api.js        — fetch wrappers (fetchLiveMatches, fetchAllStreams…)
    ui.js         — DOM helpers (showSkeletons, renderNav, toasts…)
    player.js     — openPlayer, closePlayer, toggleFullscreen
    streams.js    — loadStream, watchdog, unmute
    matches.js    — loadMatches, renderMatches, renderCard
    app.js        — init(), event wiring, DOMContentLoaded (load last)
  index.html
```

## Design system
- Primary: #FC4C02 (Strava orange)
- Dark theme: #0f0f0f base, #161616 surface, #1e1e1e raised
- Motion: spring easing for entrances, smooth for fades
- Skeletons: always shown before fetch resolves

## Key UX decisions
- Skeleton cards appear BEFORE fetch, replaced on resolve
- iframe onload unreliable cross-origin: use 3500ms timeout
- Promise.allSettled for streams: partial success is fine
- Player bar navigates streams without reopening panel
- Two-panel layout: 220px sidebar + scrollable main + 72px fixed player bar
- Fullscreen targets `.iframe-wrapper` div (not iframe itself) — CSS :fullscreen expands it
- Frontend is plain `<script>` tags (no bundler); load order enforces dependencies

## Keyboard shortcuts
- `F` — toggle fullscreen
- `←` / `→` — previous / next stream
- `Esc` — close player
