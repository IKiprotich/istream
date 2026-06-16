const { Router } = require('express');
const { getLiveMatches, getMatchesByCategory } = require('../controllers/matches.controller');

const router = Router();

router.get('/live', getLiveMatches);
router.get('/:category', getMatchesByCategory);

module.exports = router;
