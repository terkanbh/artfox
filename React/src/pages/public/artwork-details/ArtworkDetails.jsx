import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import styles from './ArtworkDetails.module.css';
import RandomArtworks from '~/shared/random-artworks/RandomArtworks.jsx';
import { getArtwork } from '~/services/artworksService.js';
import { useCart } from '~/hooks/useCart.jsx';

export default function ArtworkDetails() {
  const { id } = useParams();
  const { addItemToCart } = useCart();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState();
  const [qty, setQty] = useState(1);

  const changeQty = (newQty) => {
    if (newQty < 1) return;
    setQty(newQty);
  };

  const addToCart = () => {
    addItemToCart({ itemId: id, quantity: qty })
      .then(_ => toast.success(`Успешно добавихте продукт в количката.`))
      .catch(_ => toast.error('Възникна грешка, моля опитайте по-късно.'));
  }

  const order = () => {
    addToCart();
    navigate('/order');
  }

  useEffect(() => {
    getArtwork(id)
      .then(res => setArtwork(res))
      .catch(_ => {
        toast.error('Възникна грешка, моля опитайте по-късно.');
        navigate('/');
      })
  }, [id]);

  if (!artwork) return <></>;

  const images = artwork.images.map(img => ({
    original: `data:image/jpeg;base64,${img.imageData}`,
    thumbnail: `data:image/jpeg;base64,${img.imageData}`,
  }));

  return (<>
    <div className="container mb-5">
      <h2 className={styles['heading']}> Детайли </h2>
      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <ImageGallery items={images} showPlayButton={false} useBrowserFullscreen={false} showBullets={true} />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column gap-3">
          <h3 className={styles['title']}> {artwork.title} </h3>
          <div className={styles['price']}> {artwork.price} лв </div>
          <div className={styles['delivery-note']}> С включени данъци. <span>Доставката</span> се изчислява при плащане. </div>
          <div className={styles['quantity-input']}>
            <button className="btn" type="button" onClick={() => changeQty(qty - 1)}> - </button>
            {qty}
            <button className="btn" type="button" onClick={() => changeQty(qty + 1)}> + </button>
          </div>
          <button className="btn btn-danger" onClick={order}> Купи </button>
          <button className="btn btn-outline-dark" onClick={addToCart}> Добавяне в количката </button>
          <div> {artwork.description} </div>
        </div>
      </div>
    </div>
    <RandomArtworks title='Подобни' />
  </>);
}