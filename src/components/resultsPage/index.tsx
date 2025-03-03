import BackLink from '../backLink';
import styles from './results.module.css';

const ResultsPage = () => {
  return (
    <div className={styles['results-page']}>
      <h1>Results</h1>
      <h2>Order basket redesing</h2>
      <BackLink />
    </div>
  );
};

export default ResultsPage;
