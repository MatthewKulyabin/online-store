import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import productService from '../services/product.service';
import { toast } from 'react-toastify';

const ProductContext = React.createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingP, setIsLoadingP] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getProductsList = async () => {
    try {
      const { content } = await productService.get();
      setProducts(content);
      setIsLoadingP(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getProduct = (id) => {
    return products.find((prod) => prod._id === id);
  };

  const deleteProduct = async (id) => {
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((prod) => prod._id !== id));
    } catch (error) {
      errorCatcher(error);
    }
  };

  const postProduct = async (data) => {
    try {
      const { content } = await productService.post(data);
      setProducts((prev) => [...products, content]);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const putProduct = async (id, data) => {
    try {
      const { content } = await productService.put(id, data);
      setProducts((prev) =>
        prev.map((prod) => (prod._id === id && content) || prod)
      );
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setIsLoadingP(false);
  };

  console.log(error);

  return (
    <ProductContext.Provider
      value={{
        isLoadingP,
        products,
        getProduct,
        deleteProduct,
        postProduct,
        putProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
