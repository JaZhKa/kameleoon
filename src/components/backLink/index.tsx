import { Link } from 'react-router-dom';
import styles from './backLink.module.css';

const BackLink = () => {
  return (
    <div className={styles['back-link']}>
      <Link to='/'>Back</Link>
    </div>
  );
};

export default BackLink;
