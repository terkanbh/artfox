import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RandomArtworks.module.css';
import { getRandomArtworks } from '~/services/artworksService.js';
import Cards from '~/shared/cards/Cards.jsx';
import ServerError from '~/shared/server-error/ServerError.jsx';
import Loading from '~/shared/loading/Loading.jsx';

export default function RandomArtworks({ title }) {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRandomArtworks(4)
      .then(res => setArtworks(res))
      .catch(_ => setError(true))
      .finally(_ => setLoading(false))
  }, []);

  if (error) return <ServerError />;
  if (loading) return <Loading />;

  return (<>
    <div className='container'>
      <h2 className={styles['title']}> {title} </h2>
      <div className="row">
        <div className="col">
          <Cards artworks={artworks}/>
        </div>
      </div>
      <div className="row my-1">
        <div className="col text-center">
          <Link className="btn btn-sm btn-danger" to={'/artworks'}>Покажи всички</Link>
        </div>
      </div>
    </div >
  </>);
}