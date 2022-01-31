const express = require('express');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');

const initDatabase = require('./startUp/initDatabase');
const router = require('./routes');
const Category = require('./models/Category');
const Product = require('./models/Product');

const app = express();

const PORT = config.get('port') ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/api', router);

app.get('/api/category', async (req, res) => {
  const category = await Category.find();
  res.send(category);
});

app.get('/api/product', async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

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
