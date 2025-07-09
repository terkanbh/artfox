import { useEffect }    from 'react';
import { useNavigate }  from 'react-router-dom';
import { useForm }      from 'react-hook-form';
import { toast }        from 'sonner';

import styles           from './Login.module.css';
import { useAuth }      from '~/hooks/useAuth.jsx';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  if (isAuthenticated) return null;

  register('username', { required: true, minLength: 5 });
  register('password', { required: true, minLength: 5 });

  const onSubmit = (data) => {
    login(data)
      .then(_ => {
        toast.success('Успешен логин.');
        navigate('/');
      })
      .catch(_ => toast.error('Неуспешен логин.'));
  }

  return (
    <div className={`container ${styles['container']}`}>
      <h1 className={styles['heading']}> Логин </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* USERNAME */}
        <div className="form-floating mb-3">
          <input className="form-control" type="text" {...register('username')} />
          <label className="form-label"> Username * </label>
        </div>
        {/* PASSWORD */}
        <div className="form-floating mb-3">
          <input className="form-control" type="password" {...register('password')} />
          <label className="form-label"> Password * </label>
        </div>
        <button className={`btn btn-danger`} type="submit" disabled={!isValid || isSubmitting}> Login </button>
      </form>
    </div>
  );
}