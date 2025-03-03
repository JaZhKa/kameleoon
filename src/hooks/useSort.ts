import { useState, useMemo, useCallback } from 'react';
import { ITest } from '../types/dataTypes';

export type SortDirection = 'asc' | 'desc';
export type SortKey = 'name' | 'type' | 'status' | 'site';

interface ISortConfig {
  key: SortKey | null;
  direction: SortDirection | null;
}

const statusOrder = {
  ONLINE: 1,
  PAUSED: 2,
  STOPPED: 3,
  DRAFT: 4,
};

const useSort = (
  data: ITest[]
): [ITest[], (key: SortKey) => void, ISortConfig] => {
  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    const sortableItems = [...data];

    sortableItems.sort((a, b) => {
      let aValue, bValue;
      if (sortConfig.key === 'status') {
        aValue =
          statusOrder[a.status.toUpperCase() as keyof typeof statusOrder] || 0;
        bValue =
          statusOrder[b.status.toUpperCase() as keyof typeof statusOrder] || 0;
      } else if (sortConfig.key === 'site') {
        aValue = a.siteName;
        bValue = b.siteName;
      } else {
        aValue = a[sortConfig.key as keyof ITest];
        bValue = b[sortConfig.key as keyof ITest];
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = useCallback((key: SortKey) => {
    setSortConfig((prevConfig) => {
      let direction: SortDirection = 'asc';
      if (prevConfig.key === key && prevConfig.direction === 'asc') {
        direction = 'desc';
      }
      return { key, direction };
    });
  }, []);

  return [sortedData, requestSort, sortConfig];
};

export default useSort;
