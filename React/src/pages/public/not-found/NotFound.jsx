import styles from './NotFound.module.css';

export default function NotFound() {
    return <h1 className={styles['error']}>Страницата не съществува.</h1>;
}