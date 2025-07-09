import { useState } from 'react';
import { useCart } from '~/hooks/useCart.jsx';
import CartModal from './CartModal.jsx';
import styles from './CartIcon.module.css';

export default function CartIcon() {
  const { cartItemsCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  let counterClasses = styles['cart-items-count'];
  if (!cartItemsCount) counterClasses += ` ${styles['cart-empty']}`;

  return (<>
    <div className={styles['cart-icon-container']}>
      <button className="nav-link" onClick={() => setShowCart(true)}>
        <img src="/cart.png" alt="cart" width="30px"/>
        <span className={counterClasses}> {cartItemsCount} </span>
      </button>
    </div>
    {showCart && <CartModal onClose={() => setShowCart(false)}/>}
  </>);
}
