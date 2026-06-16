const { Router } = require('express');
const { getStreams } = require('../controllers/streams.controller');

const router = Router();

router.get('/:source/:id', getStreams);

module.exports = router;
