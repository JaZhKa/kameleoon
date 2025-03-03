import getSiteName from '../../helpers/getSiteName';
import getUniqueColor from '../../helpers/getUniqueColor';
import capitalizeString from '../../helpers/capitalizeString';
import { IData, ITest } from '../../types/dataTypes';
import Button from '../../components/button';
import { SortKey, SortDirection } from '../../hooks/useSort';
import { useNavigate } from 'react-router-dom';
import styles from './testsList.module.css';

interface ITestsListProps {
  filteredTests: ITest[];
  data: IData;
  requestSort: (key: SortKey) => void;
  sortConfig: { key: SortKey | null; direction: SortDirection | null };
}

const TestsList = ({
  filteredTests,
  data,
  requestSort,
  sortConfig,
}: ITestsListProps) => {
  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 'asc' : 'desc';
  };

  const navigate = useNavigate();

  return (
    <div className={styles['test-list']}>
      <table className={styles['table']}>
        <thead>
          <tr>
            <th className={styles['table__head-color']}></th>
            <th
              className={styles[`table__head-name-${getSortIcon('name')}`]}
              onClick={() => requestSort('name')}
            >
              NAME
            </th>
            <th
              className={styles[`table__head-name-${getSortIcon('type')}`]}
              onClick={() => requestSort('type')}
            >
              TYPE
            </th>
            <th
              className={styles[`table__head-name-${getSortIcon('status')}`]}
              onClick={() => requestSort('status')}
            >
              STATUS
            </th>
            <th
              className={styles[`table__head-name-${getSortIcon('site')}`]}
              onClick={() => requestSort('site')}
            >
              SITE
            </th>
            <th className={styles['table__head-button']}></th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.map((item) => (
            <tr key={item.id}>
              <td
                className={styles['table__body-color']}
                style={{ backgroundColor: getUniqueColor(item.siteId) }}
              >
                <span className={styles['color-box']}></span>
              </td>
              <td className={styles['table__body-name']}>
                <strong>{item.name}</strong>
              </td>
              <td className={styles['table__body-type']}>
                {capitalizeString(item.type)}
              </td>
              <td className={styles[`table__body-status-${item.status}`]}>
                {capitalizeString(item.status)}
              </td>
              <td className={styles['table__body-site']}>
                {getSiteName(data.sites, item.siteId)}
              </td>
              <td className={styles['table__body-button']}>
                <Button callback={() => {navigate(`/${item.status !== 'DRAFT' ? 'results' : 'finalize'}`)}}>
                  {item.status !== 'DRAFT' ? 'Results' : 'Finalize'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestsList;
