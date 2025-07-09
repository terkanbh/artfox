import styles from './ImageManager.module.css';

export default function ImageManager({ useImages }) {
  return (
    <div className="container-fluid p-0">
      <ImagesInput useImages={useImages} />
      <ImagesMap useImages={useImages} />
    </div>
  );
}

function ImagesInput({useImages}) {
  const [images, setImages] = useImages();

  const onImageInput = e => {
    const file = e.target.files[0];
    const newImage = {
      id: null,
      imageData: file,
      previewUrl: URL.createObjectURL(file),
      displayOrder: images.length
    };
    setImages([...images, newImage]);
  };

  return (
    <div className="row mb-4">
      <div className="col">
        <input className="form-control form-control-lg" hidden type="file" id="upload"
          onChange={onImageInput} />
        <label className={styles['image-label']} htmlFor="upload"> Добави снимка </label>
      </div>
    </div>
  );
}

function ImagesMap({useImages}) {
  const [images, setImages] = useImages();

  if (!images.length) return '';

  const swap = (i, j) => {
    if (i < 0 || j < 0 || i > images.length - 1 || j > images.length - 1) return;
    const newImages = [...images];
    newImages[i].displayOrder = j;
    newImages[j].displayOrder = i;
    const temp = newImages[i];
    newImages[i] = newImages[j];
    newImages[j] = temp;
    setImages(newImages);
  };

  const remove = (i) => {
    if (i < 0 || i > images.length - 1) return;
    const newImages = images.filter(x => x.displayOrder !== i);
    newImages.map((image, index) => image.displayOrder = index);
    setImages(newImages);
  }

  const imagesMap = images.map((image) => (
    <div className="col-auto mb-4" key={image.displayOrder}>
      <div className={`card ${styles['card']}`}>
        <img className={`card-img-top ${styles['card-img']}`} src={image.previewUrl} />
        {image.displayOrder === 0 && <div className="card-img-overlay p-1 text-end"> 🖼️ </div>}
        <div className="card-body d-flex justify-content-center gap-1 z-1">
          {image.displayOrder !== 0 && <button className="btn btn-sm btn-primary" type="button" onClick={() => swap(image.displayOrder, image.displayOrder - 1)}> &larr; </button>}
          {image.displayOrder !== images.length - 1 && <button className="btn btn-sm btn-primary" type="button" onClick={() => swap(image.displayOrder, image.displayOrder + 1)}> &rarr; </button>}
          <button className="btn btn-sm btn-primary" type="button" onClick={() => remove(image.displayOrder)}> &times; </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="row d-flex justify-content-start">
      {imagesMap}
    </div>
  );
}