const streamedService = require('../services/streamed.service');
const config = require('../config');

async function getStreams(req, res, next) {
  try {
    const { source, id } = req.params;
    if (!config.VALID_SOURCES.includes(source.toLowerCase())) {
      return res.status(400).json({
        error: `Invalid source. Must be one of: ${config.VALID_SOURCES.join(', ')}`,
      });
    }
    const data = await streamedService.getStreams(source, id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getStreams };
