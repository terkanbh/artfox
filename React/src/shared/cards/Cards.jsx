import { Link }   from 'react-router-dom';
import { toast }  from 'sonner';

import styles       from './Cards.module.css';
import { useCart }  from '~/hooks/useCart.jsx';

export default function Cards({artworks}) {
  return (<>
    <div className='container-fluid p-0'>
      <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-4 g-2 mb-3">
        {artworks.map(a => <Card key={a.id} artwork={a}/>)}
      </div>
    </div>
  </>);
}

function Card({ artwork }) {
  const {addItemToCart} = useCart();

  const addToCartHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart({itemId: id, quantity: 1})
      .then(_ => toast.success(`Успешно добавихте продукт в количката.`))
      .catch(_ => toast.error('Възникна грешка при добавянето на продукт в количката. Моля опитайте по-късно.'));
  }

  return (<>
    <div className="col">
      <Link className={styles['card-link']} to={`/artworks/${artwork.id}`}>
        <div className={`card d-flex flex-column h-100 ${styles['card']}`}>
          {/* Image */}
          <img className={`flex-grow-1 card-img-top ${styles['card-img-top']}`} src={`data:image/jpeg;base64,${artwork.images[0].imageData}`}/>
          <div className={`card-body flex-grow-0 ${styles['card-body']}`}>
            {/* Name */}
            <h2 className={`card-title mb-1 ${styles['card-title']}`}> {artwork.title} </h2>
            {/* Price */}
            <p className={`mb-1 ${styles['price']}`}> {artwork.price} <span className={styles['currency']}> лв </span> </p>
            <div className={styles['btn-container']}>
              {/* Add to cart button */}
              <button className={`btn btn-sm btn-danger ${styles['btn']}`} type="button" onClick={(e) => addToCartHandler(e, artwork.id)}> Добави в количка </button>
            </div>
          </div>
        </div>
      </Link >
    </div >
  </>);
}