import { Link } from 'react-router-dom';

import styles   from './AdminNavbar.module.css';

export default function AdminNavbar() {
  return (
    <div className="container mb-3">
      <div className={styles['nav']}>
        <Link className="btn btn-sm btn-outline-danger" to='/admin/orders'> Поръчки </Link>
        <Link className="btn btn-sm btn-outline-danger" to='/admin/artworks'> Продукти </Link>
        <Link className="btn btn-sm btn-outline-danger" to='/admin/artworks/create'> Добави Продукт </Link>
      </div>
    </div>
  );
}