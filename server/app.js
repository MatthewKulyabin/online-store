const express = require('express');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');

const initDatabase = require('./startUp/initDatabase');
const router = require('./routes');

const app = express();

const PORT = config.get('port') ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

const start = async () => {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });

    mongoose.connect(config.mongoUri);

    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on ${PORT} port...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};

start();
