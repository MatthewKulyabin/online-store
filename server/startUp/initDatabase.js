const Category = require('../models/Category');
const Product = require('../models/Product');
const categoryMock = require('../mock/category.json');
const productMock = require('../mock/product.json');

module.exports = async () => {
  const category = await Category.find();
  const product = await Product.find();

  if (category.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }
  if (product.length !== productMock.length) {
    console.log('adsadsadsasd');
    await createInitialEntity(Product, productMock);
  }
};

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        if (item.categoryId) delete categoryId;
        const newItem = new Model(item);
        await newItem.save();
      } catch (error) {
        return error;
      }
    })
  );
};
