const os = require('os');
const app = require('./app');
const config = require('./config');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

app.listen(config.PORT, config.HOST, () => {
  const localIP = getLocalIP();

  console.log('');
  console.log('  \x1b[38;5;208m▶ iStream\x1b[0m is running');
  console.log('');
  console.log(`  Local:    \x1b[36mhttp://localhost:${config.PORT}\x1b[0m`);

  if (localIP) {
    console.log(`  Network:  \x1b[32mhttp://${localIP}:${config.PORT}\x1b[0m  ← share this with friends on WiFi`);
  } else {
    console.log('  Network:  \x1b[33munable to detect local IP\x1b[0m');
  }

  console.log('');
  console.log(`  Env:      ${config.NODE_ENV}`);
  console.log('');
});
