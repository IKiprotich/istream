const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const apiRouter = require('./routes');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(requestLogger);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', apiRouter);

app.use(errorHandler);

module.exports = app;
