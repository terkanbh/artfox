import { useState } from 'react';
import { useEcont } from '~/hooks/useEcont.jsx';
import InputValidation from '~/shared/input-validation/InputValidation.jsx';
import styles from './DeliveryInput.module.css';

export default function DeliveryInput({ register, setValue, watch, errors }) {
  const deliveryType = watch('deliveryType');
  const [showModal, setShowModal] = useState(false);

  return (<>
    <p>Доставките се извършват с <img src="econt.png" width="55px" /></p>

    {/* OFFICE RADIO */}
    <div className="form-check">
      <input className="form-check-input" type="radio" value="toOffice" {...register('deliveryType')} />
      <label className="form-check-label"> До Офис </label>
    </div>

    {/* ADDRESS RADIO */}
    <div className="form-check mb-3">
      <input className="form-check-input" type="radio" value="toAddress" {...register('deliveryType')} />
      <label className="form-check-label"> До Адрес </label>
    </div>

    {/* CONDITIONAL INPUT */}
    {
      deliveryType === 'toOffice'
      ? <OfficeInput register={register} errors={errors} showModal={() => setShowModal(true)} />
      : <AddressInput register={register} errors={errors} />
    }

    {/* MODAL */}
    {showModal && <Modal setValue={setValue} onClose={() => setShowModal(false)} />}
  </>);
}

function OfficeInput({ register, showModal, errors }) {
  return (
    <div className="form-floating mb-3">
      <input className={`form-control ${styles['office-selector']}`}
        onClick={showModal} readOnly {...register('address')} />
      <label className="form-label"> Моля изберете офис * </label>
      <InputValidation error={errors.address} />
    </div>
  );
}

function AddressInput({ register, errors }) {
  return (
    <div className="form-floating mb-3">
      <input className="form-control" {...register('address')} />
      <label className="form-label"> Моля въведете адрес * </label>
      <InputValidation error={errors.address} />
    </div>
  );
}

function Modal({ setValue, onClose }) {
  const { error } = useEcont();
  const close = (e) => e.target == e.currentTarget ? onClose() : null;
  return (
    <div className={`modal show ${styles['modal']}`} onClick={close}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <img src="econt.png" width="80px" />
            <button className="btn-close" type="button" aria-label="Close" onClick={close}></button>
          </div>
          <div className="modal-body">
            {
              error
              ? 'Възникна грешка, моля презаредете страницата.'
              : <OfficeSelect setValue={setValue} onClose={onClose} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function OfficeSelect({ setValue, onClose }) {
  const { offices, filter } = useEcont();

  const handleSelect = (office) => {
    setValue('address', office, { shouldValidate: true });
    onClose();
  }

  const officesMap = offices.map((x, i) =>
    <li className={`list-group-item ${styles['office']}`} key={i}
      onClick={() => handleSelect(x)}> {x} </li>);

  return (<>
    <input className="form-control mb-2" type="text" onChange={(e) => filter(e.target.value)} placeholder="Търси..." />
    <ul className="list-group">{officesMap}</ul>
  </>);
}