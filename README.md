# iStream 🟠

Watch live sports streams in your browser.
Built on top of the streamed.pk API with a clean dark UI.

## Requirements
- Node.js 18+
- npm

## Run it

```bash
git clone https://github.com/IKiprotich/istream.git
cd istream
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## How to use

1. Pick a sport from the left sidebar
2. Click any match card to open the stream
3. If a stream buffers, use the **← →** arrows
   in the bottom bar to switch to another source —
   this is the fastest fix for buffering

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `F` | Fullscreen |
| `←` `→` | Switch stream source |
| `Esc` | Close player |

## Notes

- Streams only appear when live matches are happening
- Stream quality depends entirely on the source —
  the app always picks the best HD source available
- This is a personal learning project, not affiliated
  with streamed.pk
