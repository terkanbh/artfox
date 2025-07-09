import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { sendQuery } from '~/services/contactsService.js';
import { nameValidator, emailValidator, contentValidator } from '~/utils/validators.js';
import styles from './Contacts.module.css';

export default function Contacts() {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors, isSubmitting, isValid}}
    = useForm({ mode: 'onTouched'});

  const nameReg = register('name', nameValidator);
  const emailReg = register('email', emailValidator);
  const contentReg = register('content', contentValidator);

  const onSubmit = (data) => {
    sendQuery(data)
      .then(_ => toast.success('Запитването е изпратено успешно.'))
      .catch(_ => toast.error('Възникна грешка при изпращането на запитване. Моля опитайте по-късно.'))
      .finally(_ => navigate('/'));
  }
  
  return (
    <div className='container'>
      <h2 className={styles['title']}> Контакти </h2>
      <p> Ако имате въпрос, моля задайте го тук или се обадете на телефон: <a className={styles['tel']} href="tel:+35988888888">+359 88 888 888</a> </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          {/* Name */}
          <div className='col-md'>
            <div className='form-floating mb-3'>
              <input className='form-control' type="text" {...nameReg}/>
              <label className='form-label' htmlFor="name"> Име * </label>
              {errors.name && <small className={`text-danger ${styles['validation']}`}>Името е задължително.</small>}
            </div>
          </div>
          {/* Email */}
          <div className='col-md'>
            <div className='form-floating mb-3'>
              <input className='form-control' type="email" {...emailReg}/>
              <label className='form-label' htmlFor="email"> Имейл * </label>
              {errors.email && <small className={`text-danger ${styles['validation']}`}>Моля, въведете валиден имейл.</small>}
            </div>
          </div>
        </div>
        {/* Query */}
        <div className='row'>
          <div className='col'>
            <div className='form-floating mb-3'>
              <textarea className={`form-control ${styles['query']}`} {...contentReg}></textarea>
              <label className="form-label" htmlFor="query"> Запитване * </label>
              {errors.content && <small className={`text-danger ${styles['validation']}`}>Запитването трябва да е поне 10 символа.</small>}
            </div>
          </div>
        </div>
        {/* Submit */}
        <button className="btn btn-danger" type="submit" disabled={!isValid || isSubmitting}>
          {
            isSubmitting &&
            <span aria-hidden="true"
              className="spinner-border spinner-border-sm" role="status">
            </span>
          }
          Изпрати
        </button>
      </form>
    </div>
  );
}