const { Router } = require('express');
const matchesRouter = require('./matches.routes');
const streamsRouter = require('./streams.routes');

const router = Router();

router.get('/health', (req, res) =>
  res.json({ status: 'ok', timestamp: Date.now() })
);

router.use('/matches', matchesRouter);
router.use('/stream', streamsRouter);

module.exports = router;
