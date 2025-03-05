import { useState, ChangeEvent } from 'react';
import useGetData from '../../api/useGetData';
import TestsList from '../testsList';
import { ITest, IData } from '../../types/dataTypes';
import Button from '../button';
import useSort from '../../hooks/useSort';
import Loader from '../loader';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const { data, loading, error } = useGetData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTests: ITest[] =
    (data &&
      data.tests.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
    [];

  const addSiteName = (item: ITest, data: IData): ITest => ({
    ...item,
    siteName:
      data.sites.find((site) => Number(site.id) === item.siteId)?.url || '',
  });

  const dataWithSiteName = data?.tests.map((item) => addSiteName(item, data));
  const [sortedData, requestSort, sortConfig] = useSort(dataWithSiteName || []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (error) return <div className={styles['error']}>Error: {error}</div>;

  return (
    <div className={styles['dashboard']}>
      <h1>Dashboard</h1>
      <div className={styles['input__icon']}>
        <input
          type='text'
          placeholder='What test are you looking for?'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className={styles['input__item-count']}>
          {filteredTests.length} items
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        data &&
        (filteredTests.length > 0 ? (
          <TestsList
            filteredTests={sortedData.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            data={data}
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
        ) : (
          <div className={styles['not-found']}>
            <div className={styles['not-found-text']}>
              Your search did not match any results.
            </div>
            <Button callback={() => setSearchTerm('')}>Reset</Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
