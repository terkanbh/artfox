import { useEffect }    from 'react';
import { useNavigate }  from 'react-router-dom';

import { useCart }  from '~/hooks/useCart.jsx';
import styles       from './CartModal.module.css';

export default function CartModal({ onClose }) {
  const navigate = useNavigate();
  const { cartItemsCount } = useCart();

  const close = (e) => {
    if (e.target == e.currentTarget) onClose();
  };

  const order = () => {
    onClose();
    navigate('/order');
  }

  useEffect(() => {
    if (cartItemsCount === 0) onClose();
  }, [cartItemsCount]);

  if (cartItemsCount === 0) return null;

  return (<>
    <div className={`modal fade show ${styles['modal']}`} onClick={close}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"> Количка </h5>
          </div>
          <div className="modal-body">
            <CartItems />
            <div className={`d-flex justify-content-between ${styles['card-footer']}`}>
              <button className="btn btn-sm btn-secondary" aria-label="Close" onClick={close}> Назад </button>
              <button className="btn btn-sm btn-danger" onClick={order} disabled={cartItemsCount === 0}> Поръчай </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

function CartItems() {
  const { cart } = useCart();
  if (cart.length === 0) return <p className='text-center'> Количката е празна. </p>;
  return cart.map(item => <CartItem key={item.id} item={item} />);
}

function CartItem({ item }) {
  const { deleteItemFromCart, updateCartItemQty } = useCart();

  const updateQty = (qty) => {
    if (qty > 0) updateCartItemQty({itemId: item.id, quantity: qty});
    else deleteItemFromCart(item.id);
  }

  return (
    <div className={`row mb-4 ${styles['item-wrapper']}`}>
      <div className="col p-0">
        <div className="container">
          <div className="row mb-1">
            <div className="col p-0 d-flex align-items-center">
              <img className="me-3" width='50px' src={`data:image/jpeg;base64,${item.imageData}`} />
              <h6 className={styles['item-title']}> {item.title} </h6>
            </div>
          </div>
          <div className="row">
            <div className="col p-0 d-flex align-items-center justify-content-between">
              <div className={styles['quantity-input']}>
                <button className={`btn btn-sm ${styles['btn-xs']}`} type="button" onClick={() => updateQty(item.quantity - 1)}> - </button>
                <span className={styles['quantity-wrapper']}>
                  {item.quantity}
                </span>
                <button className={`btn btn-sm ${styles['btn-xs']}`} type="button" onClick={() => updateQty(item.quantity + 1)}> + </button>
              </div>
              <div className={styles['price-wrapper']}>
                {(item.price * item.quantity).toFixed(2)} лв
              </div>
              <div className={styles['remove-item-wrapper']}>
                <button className="btn-close" type="button" onClick={() => deleteItemFromCart(item.id)}></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}