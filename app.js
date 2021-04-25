/* eslint-disable quotes */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const helmet = require('helmet');

const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(helmet());

const { json } = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rt = require('file-stream-rotator');
const { Writable } = require('stream');
const authentication = require('./Middleware/Authentication');
const sendEmailJob = require('./Middleware/sendEmailJob');
const avengers = require('./routes/products');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');
const carts = require('./routes/carts');
require('dotenv').config();
const currency = require('./routes/currency');

const logPath = path.join(__dirname, 'log', 'access.log');
// const task = require("./Test/task")

const port = process.env.PORT;
const host = process.env.HOST;

class TerminalStream extends Writable {
  write(line) {
    // here you send the log line to wherever you need
   	 console.log('Logger:: ', line);
  }
}

const fileWriter = rt.getStream({ filename: 'Logs/Error logs/errors.log', frequency: 'daily', verbose: true });
const successWriter = rt.getStream({ filename: 'Logs/Success logs/success.log', frequency: 'daily', verbose: true });

// Skip requests that aren't for the homepage
const skipSuccess = (req, res) => res.statusCode < 400; const skipError = (req, res) => res.statusCode >= 400;

// error logging
app.use(morgan('combined', {
  skip: skipSuccess,
  stream: fileWriter,
}));

// success logging
app.use(morgan('combined', {
  skip: skipError,
  stream: successWriter,
}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(`mongodb://${host}/productsDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log('Connected to db successfully ...'))
  .catch((err) => console.log('Error has occured while connecting to db', err));

app.use(cors());
app.use(express.json());
app.use(home);
// app.use(authentication);
// app.use(sendEmailJob);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/carts/', carts);
// app.use(avengers);
app.use('/api/avengers', avengers);

app.use('/api/currency', currency);

module.exports = app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
