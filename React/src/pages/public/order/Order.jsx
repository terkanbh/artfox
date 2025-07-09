import { useEffect }          from 'react';
import { useNavigate }        from 'react-router-dom';
import { toast }              from 'sonner';
import { useCart }            from '~/hooks/useCart.jsx';
import { createOrder }        from '~/services/ordersService.js';
import InputValidation        from '~/shared/input-validation/InputValidation.jsx';
import DeliveryInput          from '~/shared/delivery-input/DeliveryInput.jsx';
import styles                 from './Order.module.css';
import { useOrderForm }       from './useOrderForm.jsx';

export default function Order() {
  const navigate = useNavigate();
  const { cart, cartTotal, refreshCart } = useCart();
  const form = useOrderForm();
  const { register, handleSubmit, setValue, watch, formState } = form;
  const { errors, isSubmitting, isValid } = formState;

  const deliveryType = watch('deliveryType');
  const deliveryPrice = watch('deliveryPrice');
  const total = cartTotal + deliveryPrice;

  useEffect(() => {
    if (cart.length === 0) navigate('/');
    const price = deliveryType === 'toOffice' ? 6.04 : 7.61;
    setValue('deliveryPrice', price);
    setValue('address', '');
  }, [deliveryType, cart]);

  const onSubmit = (data) => {
    createOrder(data)
      .then(_ => toast.success('Поръчката е направена успешно.'))
      .catch(_ => toast.error('Възникна грешка при поръчка. Моля опитайте отново.'))
      .finally(_ => {
        refreshCart();
        navigate('/');
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-3"> Данни </h2>
            {/* FIRST NAME INPUT */}
            <div className="form-floating mb-3">
              <input className="form-control" type="text" {...register('firstName')} />
              <label className="form-label"> Име * </label>
              <InputValidation error={errors.firstName} />
            </div>
            {/* LAST NAME INPUT */}
            <div className="form-floating mb-3">
              <input className="form-control" type="text" {...register('lastName')} />
              <label className="form-label"> Фамилия * </label>
              <InputValidation error={errors.lastName} />
            </div>
            {/* TEL INPUT */}
            <div className="form-floating mb-3">
              <input className="form-control" type="tel" {...register('tel')} />
              <label className="form-label"> Телефон * </label>
              <InputValidation error={errors.tel} />
            </div>
            {/* EMAIL INPUT */}
            <div className="form-floating mb-3">
              <input className="form-control" type="email" {...register('email')} />
              <label className="form-label"> Имейл * </label>
              <InputValidation error={errors.email} />
            </div>
            {/* DELIVERY INPUT */}
            <DeliveryInput register={register} setValue={setValue} watch={watch} errors={errors} />
          </div>

          <div className="col-md-6">
            <h2 className={`mb-3 ${styles['summary-heading']}`}> Обобщение </h2>
            <SummaryTable cart={cart} deliveryPrice={deliveryPrice} total={total}/>

            {/* SUBMIT BUTTON */}
            <div className="d-flex justify-content-center">
              <button className={`btn btn-danger ${styles['submit']}`} type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm" role="status"></span>}
                Поръчай
              </button>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
}

function SummaryTable({cart, deliveryPrice, total}) {

  const cartMap = cart.map(item =>
    <tr key={item.id}>
      <td className={styles['title']}> {item.title} <span className={styles['quantity']}>x{item.quantity}</span></td>
      <td className={styles['price-td']}> {(item.price * item.quantity).toFixed(2)} лв </td>
    </tr>
  );

  return (
    <table className={`table ${styles['table']}`}>
      <thead>
        <tr>
          <th scope="col"> ПРОДУКТ </th>
          <th className={styles['price-th']} scope="col"> ОБЩО </th>
        </tr>
      </thead>
      <tbody>
        { cartMap }
      </tbody>
      <tfoot>
        <tr>
          <td> Доставка </td>
          <td className={styles['price-td']}> {deliveryPrice.toFixed(2)} лв </td>
        </tr>
        <tr>
          <td className={styles['total']}> ОБЩО </td>
          <td className={`${styles['price']} ${styles['total-price']}`}> {total.toFixed(2)} лв </td>
        </tr>
      </tfoot>
    </table>
  );
}