import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FormComponent, {
  SelectField,
  TextField,
  SelectImageField,
  NumberField,
} from '../../common/form';
import Joi from 'joi';
import { useProduct } from '../../../hooks/useProduct';
import { Col, InputGroup } from '../../common/containers';
import { Button, Header } from '../../common/text';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../../store/product';
import { getCategoryState } from '../../../store/category';

const AdminForm = ({ choseId }) => {
  const dispatch = useDispatch();

  const [defaultData, setDefaultData] = useState();
  const { getProduct } = useProduct();

  const { entities: categories } = useSelector(getCategoryState());

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
      dispatch(
        createProduct({
          ...data,
        })
      );
    } else if (method === 'PUT') {
      dispatch(updateProduct(choseId, data));
    }
  };

  return (
    <Col className="-md-4 mb-3">
      <InputGroup className="-sm mb-3 flex-column">
        <Header size={5}>Add/Edit Product</Header>
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
            className="btn-primary"
            style={{ width: '100%' }}
            type="submit"
          >
            Save
          </Button>
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
