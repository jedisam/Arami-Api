const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoute');
const answerRouter = require('./routes/answerRoute');
const studentRouter = require('./routes/studentRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
// Global Middleware

app.use(cors());

// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(morgan('dev'));

// rate limiter from the same IP
const limiter = rateLimit({
  max: 100,
  WindowMs: 60 * 60 * 1000,
  message: 'To many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);
// body parser
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(hpp());

// serving static file
app.use(express.static(`${__dirname}/public`));
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'yeah',
  });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/answers', answerRouter);
app.use('/api/v1/studAnswers', studentRouter);

// unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this Server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
