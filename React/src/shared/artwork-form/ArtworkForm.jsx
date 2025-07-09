import { useState } from 'react';

import { useArtworkForm } from './useArtworkForm.jsx';
import styles             from './ArtworkForm.module.css';
import ImageManager       from '~/shared/image-manager/ImageManager.jsx';
import SizesManager       from '~/shared/sizes-manager/SizesManager.jsx';

export default function ArtworkForm({ initialValues, onSubmit, isUpdate = false, onDelete }) {
  const form = useArtworkForm(initialValues);
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting, isValid } = formState;
  const [images, setImages] = useState(initialValues?.images || []);
  const [sizes, setSizes] = useState(initialValues?.sizes || []);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, images, sizes ))}>
      <div className="container">
        <div className="row">
          <div className="col" style={{ maxWidth: '600px' }}>
            <h2> Добави продукт </h2>

            {/* Title */}
            <div className="row">
              <div className="col">
                <div className="form-floating mb-4">
                  <input className="form-control" type="text" {...register('title')} />
                  <label className="form-label"> Заглавие </label>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="row">
              <div className="col">
                <div className="form-floating mb-4">
                  <input className="form-control" type="number" step="0.01" min="0.01"
                    {...register('price')} />
                  <label className="form-label"> Цена </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="row">
              <div className="col">
                <div className="form-floating mb-4">
                  <textarea className="form-control" type="text" {...register('description')}
                    style={{ height: '200px' }} />
                  <label className="form-label"> Oписание </label>
                </div>
              </div>
            </div>

            <ImageManager useImages={() => [images, setImages]} />

            <SizesManager useSizes={() => [sizes, setSizes]} />

            {!isUpdate && <CreateButtons isValid={isValid} isSubmitting={isSubmitting} />}
            {isUpdate && <UpdateButtons isValid={isValid} isSubmitting={isSubmitting} onDelete={onDelete} />}
          </div>
        </div>
      </div>
    </form>
  );
}

function CreateButtons({ isValid, isSubmitting }) {
  return (
    <button className="btn btn-danger w-100" type="submit"
      disabled={!isValid || isSubmitting}>
      {isSubmitting && <span className="spinner-border spinner-border-sm" role="status"></span>}
      Запази
    </button>
  );
}

function UpdateButtons({isValid, isSubmitting, onSubmit, onDelete}) {
  return (
    <div className="d-flex justify-content-between">
        <button className={`btn btn-warning ${styles['update-buttons']}`} type="submit" onClick={onSubmit} disabled={!isValid || isSubmitting}> Запази </button>
        <button className={`btn btn-danger ${styles['update-buttons']}`}  type="button" onClick={onDelete}> Изтрий </button>
    </div>
  );
}