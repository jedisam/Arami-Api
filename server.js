const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

// require("dotenv/config");
dotenv.config({ path: './.env' });
const app = require('./app.js');
// console.log(process.env);

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully!');
  });

const PORT = process.env.PORT || 5000 || 80;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on Port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
