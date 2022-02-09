import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';

const CartContext = React.createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchedCart, setSearchedCart] = useState([]);
  const [finalCartList, setFinalCartList] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getFinalCart();
  }, [cart, searchedCart]);

  const getCart = () => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  };

  const getFinalCart = () => {
    if (searchedCart.length) {
      setFinalCartList(searchedCart);
    } else {
      setFinalCartList(cart);
    }
  };

  const postCart = (product) => {
    setCart((prev) => [...prev, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
  };

  const deleteCart = (id) => {
    setCart((prev) => prev.filter((prod) => prod._id !== id));
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.filter((prod) => prod._id !== id))
    );
  };

  const searchCart = (text) => {
    text = text.toLowerCase();
    const foundedCartProd = cart.find(
      (prod) => prod.name.toLowerCase() === text
    );

    if (foundedCartProd) {
      setSearchedCart(() => [foundedCartProd]);
    } else if (searchedCart) {
      setSearchedCart([]);
    }
  };

  const getCartPrice = () => {
    return cart.reduce((sum, prod) => (sum += prod.price), 0);
  };

  console.log('render');

  return (
    <CartContext.Provider
      value={{
        cart,
        deleteCart,
        finalCartList,
        postCart,
        getCartPrice,
        searchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
