import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import categoryService from '../services/category.service';

const CategoryContext = React.createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState();
  const [isLoadingC, setIsLoadingC] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  });

  const getCategoriesList = async () => {
    try {
      const { content } = await categoryService.get();
      setCategories(content);
      setIsLoadingC(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getCategory = (id) => {
    return categories.find((categ) => categ._id === id);
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setIsLoadingC(false);
  };

  return (
    <CategoryContext.Provider value={{ isLoadingC, categories, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CategoryProvider;
