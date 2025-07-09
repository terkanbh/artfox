import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';
import CartIcon from '~/shared/cart/CartIcon.jsx';
import { useAuth } from '~/hooks/useAuth.jsx';

export default function Navbar() {
  return (<>
    <NavbarMobile />
    <NavbarDesktop />
  </>);
}

function NavbarMobile() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (<>
    <nav className={`navbar d-md-none fixed-top ${styles['navbar-sm']}`}>
      <div className='container'>
        {/* Navigation modal button */}
        <button type="button" className="navbar-toggler" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Site logo */}
        <Link className="navbar-brand" to='/'>
          <img src="/favicon.ico" width="60" />
        </Link>
        {/* Cart icon */}
        <CartIcon />
      </div>
    </nav>
    {/* Navigation modal */}
    {showMenu && <NavigationMenu onClose={() => setShowMenu(false)} />}
  </>);
}

function NavbarDesktop() {
  const { isAuthenticated, logout } = useAuth();
  const quote = '“Creativity is magic. Don\'t examine it too closely.”';
  return (<>
    <div className={`container d-none d-md-block ${styles['navbar-md']}`}>
      <div className={`row ${styles['quote-md']}`}>
        {/* Quote */}
        <div className="col">
          <p className={styles['quote']}>{quote}</p>
        </div>
      </div>
      <div className="row py-2">
        {/* Site logo */}
        <div className={`col-md-4 ${styles['logo-md']}`}>
          <Link className="navbar-brand" to='/'>
            <img src="/logo.png" width="100px" />
          </Link>
        </div>
        {/* Navbar links */}
        <div className={`col-md-4 ${styles['menu-md']}`}>
          <Link className="btn btn-sm btn-danger" to='/'> Начало </Link>
          <Link className="btn btn-sm btn-danger" to='/artworks'> Продукти </Link>
          <Link className="btn btn-sm btn-danger" to='/contacts'> Контакти </Link>
          {isAuthenticated && <Link className="btn btn-sm btn-danger" to='/admin'> Админ </Link>}
          {isAuthenticated && <button className="btn btn-sm btn-danger" onClick={logout}> Изход </button>}
        </div>
        {/* Cart icon */}
        <div className={`col-md-4 ${styles['cart-md']}`}>
          <CartIcon />
        </div>
      </div>
    </div>
  </>)
}

function NavigationMenu({ onClose }) {
  const { isAuthenticated, logout } = useAuth();
  const handleBackdropClick = (e) => {
    if (e.target == e.currentTarget) onClose();
  };
  return (
    <div className={`modal fade show ${styles.modal}`} onClick={handleBackdropClick}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button className='btn-close' type='button' aria-label='Close'
              onClick={onClose}>
            </button>
          </div>
          <div className="modal-body d-flex flex-column gap-3">
            <Link className="btn btn-danger" to='/' onClick={onClose}> Начало </Link>
            <Link className="btn btn-danger" to='/artworks' onClick={onClose}> Продукти </Link>
            <Link className="btn btn-danger" to='/contacts' onClick={onClose}> Контакти </Link>
            {isAuthenticated && <Link className="btn btn-danger" to='/admin' onClick={onClose}> Админ </Link>}
            {isAuthenticated && <button className="btn btn-danger" onClick={logout}> Изход </button>}
          </div >
        </div >
      </div >
    </div>
  );
}