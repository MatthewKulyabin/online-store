import React from 'react';
import PropTypes from 'prop-types';

import FormComponent, {
  SelectField,
  TextField,
  SelectImageField,
  NumberField,
} from '../../common/form';
import Joi from 'joi';
import { useCategory } from '../../../hooks/useCategory';
import { useProduct } from '../../../hooks/useProduct';
import { useEffect, useState } from 'react/cjs/react.development';
import { Button, Col, InputGroup } from '../../common/containers';

const AdminForm = ({ choseId }) => {
  const [defaultData, setDefaultData] = useState();
  const { getProduct, postProduct, putProduct } = useProduct();

  const { categories } = useCategory();

  const validatorConfig = Joi.object({
    name: Joi.string().min(2).max(35).required(),
    price: Joi.number().min(0.05).required(),
    count: Joi.number().min(1).required(),
    photo: Joi.string().required(),
    categoryId: Joi.string().required(),
  });

  useEffect(() => {
    const { name, count, price, photo, categoryId } = getProduct(choseId) || {
      name: '',
      count: 0,
      price: 0,
      photo: '',
      categoryId: '',
    };
    setDefaultData({ name, count, price, photo, categoryId });
  }, [choseId]);

  const handleSubmit = (data) => {
    const method = choseId ? 'PUT' : 'POST';
    if (method === 'POST') {
      postProduct({ ...data, _id: Date.now().toString() });
    } else if (method === 'PUT') {
      putProduct(choseId, data);
    }
  };

  return (
    <Col className="-md-4 mb-3">
      <InputGroup className="-sm mb-3 flex-column">
        <h5>Add/Edit Product</h5>
        <FormComponent
          onSubmit={handleSubmit}
          validatorConfig={validatorConfig}
          defaultData={defaultData}
        >
          <TextField label="Name" name="name" autoFocus />
          <NumberField
            label="Price"
            name="price"
            min="0.00"
            step="0.05"
            span="$"
          />
          <NumberField label="Count" name="count" min="0" step="1" />
          <SelectImageField label="Choose Photo" name="photo" />

          <SelectField
            label="Category"
            defaultOption="Choose..."
            options={categories}
            name="categoryId"
          />
          <Button
            name="Save"
            className="btn-primary"
            style={{ width: '100%' }}
          />
          {/* <button className="btn btn-primary" style={{ width: '100%' }}>
            Save
          </button> */}
        </FormComponent>
      </InputGroup>
    </Col>
  );
};

AdminForm.propTypes = {
  categories: PropTypes.array,
  choseId: PropTypes.string,
};

export default AdminForm;
