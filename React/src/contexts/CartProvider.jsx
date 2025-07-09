import { createContext, useEffect, useState } from 'react';
import { addCartItem, deleteCartItem, getCartItems, updateCartItem } from '~/services/cartService.js';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const cartItemsCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const addItemToCart = (data) => addCartItem(data).then(res => setCart(res));
  const deleteItemFromCart = (itemId) => deleteCartItem(itemId).then(res => setCart(res));
  const updateCartItemQty = (data) => updateCartItem(data).then(res => setCart(res));
  const refreshCart = () => getCartItems().then(res => setCart(res));

  useEffect(() => {getCartItems().then(res => setCart(res))}, []);

  return (
    <CartContext.Provider value={{
      cart,
      cartItemsCount,
      cartTotal,
      addItemToCart,
      deleteItemFromCart,
      updateCartItemQty,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};