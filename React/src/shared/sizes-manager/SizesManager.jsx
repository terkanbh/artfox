import { useState } from 'react';

import styles from './SizesManager.module.css';

export default function SizesManager({ useSizes }) {
  const [sizes, setSizes] = useSizes();
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const addSize = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;
    setSizes([...sizes, {width, height}]);
    setWidth('');
    setHeight('');
  }

  return (
    <div className="container-fluid p-0">
      <div className="row mb-4">
        {/* WIDTH */}
        <div className="col">
          <div className="form-floating">
            <input className="form-control" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            <label className="form-label" > Ширина </label>
          </div>
        </div>
        {/* HEIGHT */}
        <div className="col">
          <div className="form-floating">
            <input className="form-control" type="number" value={height} onChange={e => setHeight(e.target.value)} />
            <label className="form-label" > Височина </label>
          </div>
        </div>
      </div>
      {/* ADD SIZE BUTTON */}
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-sm btn-primary w-100" type="button" onClick={addSize}> Добави размер </button>
        </div>
      </div>
      {/* SIZES */}
      <SizesMap useSizes={useSizes} />
    </div>
  );
}

function SizesMap({ useSizes }) {
  const [sizes, setSizes] = useSizes();
  const remove = index => {
    if (index < 0 || index > sizes.length - 1) return;
    const newSizes = sizes.filter((s, i) => i !== index);
    setSizes(newSizes);
  };

  if (sizes.length === 0) return;

  const sizesMap = sizes.map((size, index) => (
    <tr key={index}>
      <td>{size.width}</td>
      <td>{size.height}</td>
      <td className={styles['btn-close']}><button className={"btn-close"} type="button" onClick={() => remove(index)}></button></td>
    </tr>
  ));

  return (
    <div className="row mb-4">
      <div className="col">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col"> Ширина </th>
              <th scope="col"> Височина </th>
            </tr>
          </thead>
          <tbody>
            {sizesMap}
          </tbody>
        </table>
      </div>
    </div>
  );
}