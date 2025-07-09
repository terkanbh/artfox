import styles from './InputValidation.module.css';

export default function InputValidation({ error }) {
  if (!error) return;
  return (
    <small className={`text-danger ${styles['validation']}`}>
      {error.message}
    </small>
  );
}