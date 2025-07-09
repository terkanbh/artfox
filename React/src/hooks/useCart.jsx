import { useContext } from 'react';
import { CartContext } from '~/contexts/CartProvider.jsx';

export const useCart = () => useContext(CartContext);