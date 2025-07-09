import styles from './ServerError.module.css';

export default function ServerError() {
  return <h1 className={styles['error']}> Възникна проблем. Моля опитайте по-късно. </h1>;
}