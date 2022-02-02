const Category = require('../models/Category');
const Product = require('../models/Product');
const Role = require('../models/Role');
const categoryMock = require('../mock/category.json');
const productMock = require('../mock/product.json');
const roleMock = require('../mock/role.json');

module.exports = async () => {
  const category = await Category.find();
  const product = await Product.find();
  const role = await Role.find();

  if (category.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }

  if (product.length !== productMock.length) {
    await createInitialEntity(Product, productMock);
  }

  if (role.length !== roleMock.length) {
    await createInitialEntity(Role, roleMock);
  }
};

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
      } catch (error) {
        return error;
      }
    })
  );
};
