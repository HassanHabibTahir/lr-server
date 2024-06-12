const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const { errorHandler, errorConverter } = require('./middleware/error');
const routes = require('./routes');
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const app = express();
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Test');
});
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);

app.use(errorHandler);
module.exports = app;
