const CATEGORIES = [
  { id: 'live',              label: 'Live Now',      emoji: '🔴' },
  { id: 'football',          label: 'Football',      emoji: '⚽' },
  { id: 'basketball',        label: 'Basketball',    emoji: '🏀' },
  { id: 'american-football', label: 'Am. Football',  emoji: '🏈' },
  { id: 'tennis',            label: 'Tennis',        emoji: '🎾' },
  { id: 'baseball',          label: 'Baseball',      emoji: '⚾' },
  { id: 'hockey',            label: 'Hockey',        emoji: '🏒' },
  { id: 'rugby',             label: 'Rugby',         emoji: '🏉' },
  { id: 'cricket',           label: 'Cricket',       emoji: '🏏' },
];

const MAX_RETRIES             = 3;
const WATCHDOG_INITIAL_MS     = 8000;
const WATCHDOG_INTERVAL_MS    = 30000;
const STREAM_LOAD_TIMEOUT_MS  = 3500;
const REFRESH_INTERVAL_MS     = 60000;
