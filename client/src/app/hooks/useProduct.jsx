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
  const [filteredByCategoryProducts, setFilteredByCategoryProducts] = useState(
    []
  );
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [finalProductsList, setFinalProductsList] = useState([]);

  const [isLoadingP, setIsLoadingP] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    getFinalProductsList();
  }, [filteredByCategoryProducts, sortedProducts, products, searchedProduct]);

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

  const getFinalProductsList = () => {
    if (searchedProduct.length) {
      console.log('adsads');
      setFinalProductsList(searchedProduct);
    } else if (filteredByCategoryProducts.length) {
      setFinalProductsList(filteredByCategoryProducts);
    } else if (sortedProducts.length) {
      setFinalProductsList(sortedProducts);
    } else {
      setFinalProductsList(products);
    }
  };

  const getProduct = (id) => {
    console.log(products, id);
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

  const filterProductsByCategory = (id) => {
    if (id === '0') {
      setFilteredByCategoryProducts([]);
      return;
    }
    setSortedProducts([]);

    setFilteredByCategoryProducts(
      products.filter((prod) => prod.categoryId === id)
    );
  };

  const sortProducts = (item, order = 'asc') => {
    setFilteredByCategoryProducts([]);
    item = item.toLowerCase();
    item = item.replace(' ', '_');

    const arr = JSON.parse(JSON.stringify(products));
    setSortedProducts([]);
    setSortedProducts(
      arr.sort((a, b) => {
        console.log(a[item]);
        if (typeof a[item] === 'string') {
          return order === 'asc'
            ? a[item].localeCompare(b[item])
            : b[item].localeCompare(a[item]);
        }
        return order === 'asc' ? a[item] - b[item] : b[item] - a[item];
      })
    );
  };

  const searchProduct = (text) => {
    text = text.toLowerCase();
    const foundedProduct = products.find(
      (prod) => prod.name.toLowerCase() === text
    );
    if (foundedProduct) {
      setSearchedProduct(() => [foundedProduct]);
    } else if (searchedProduct) {
      setSearchedProduct([]);
    }
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setIsLoadingP(false);
  };

  return (
    <ProductContext.Provider
      value={{
        isLoadingP,
        products,
        finalProductsList,
        getProduct,
        deleteProduct,
        postProduct,
        putProduct,
        filterProductsByCategory,
        filteredByCategoryProducts,
        sortProducts,
        sortedProducts,
        searchProduct,
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
