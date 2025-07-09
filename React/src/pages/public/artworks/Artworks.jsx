import { useState, useEffect } from 'react';
import { getArtworks } from '~/services/artworksService.js';
import ServerError from '~/shared/server-error/ServerError.jsx';
import Cards from '~/shared/cards/Cards.jsx';
import Loading from '~/shared/loading/Loading.jsx';
import styles from './Artworks.module.css';

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    getArtworks()
      .then(res => setArtworks(res))
      .catch(_ => setError(true))
      .finally(_ => setLoading(false));
  }, []);

  if (error) return <ServerError />;
  if (loading) return <Loading />;

  const setPage = (page) => {
    if (page < 1 || page > artworks.length) return;
    setCurrentPage(page);
  }

  const pageOffset = (currentPage - 1) * pageSize;
  const totalPages = Math.ceil(artworks.length / pageSize); 
  const artworksShown = artworks.slice(pageOffset, pageOffset + pageSize);

  return (
  <div className='container'>
    <h2 className={styles['title']}> Продукти </h2>
    <div className='row'>
      <div className='col'>
        <Cards artworks={artworksShown} />
      </div>
    </div>
    <div className={styles['pagination']}>
      <button
        className={'btn btn-sm btn-danger'}
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}> ← </button>
      <span className={styles['current-page']}>
        Страница {currentPage} от {totalPages}
      </span>
      <button
        className={'btn btn-sm btn-danger'}
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}> → </button>
    </div>
  </div>);
}