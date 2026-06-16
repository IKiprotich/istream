const streamedService = require('../services/streamed.service');
const config = require('../config');

async function getLiveMatches(req, res, next) {
  try {
    const data = await streamedService.getLiveMatches();
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getMatchesByCategory(req, res, next) {
  try {
    const { category } = req.params;
    if (!config.VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        error: `Invalid category. Must be one of: ${config.VALID_CATEGORIES.join(', ')}`,
      });
    }
    const data = await streamedService.getMatchesByCategory(category);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getLiveMatches, getMatchesByCategory };
