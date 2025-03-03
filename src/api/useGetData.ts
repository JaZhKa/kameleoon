import { useState, useEffect } from 'react';
import { IData, ITest, ISite } from '../types/dataTypes';

const useCombinedData = () => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseTests, responseSites] = await Promise.all([
          fetch('http://localhost:3100/tests'),
          fetch('http://localhost:3100/sites'),
        ]);

        if (!responseTests.ok) {
          throw new Error(`HTTP error! status: ${responseTests.status}`);
        }
        if (!responseSites.ok) {
          throw new Error(`HTTP error! status: ${responseSites.status}`);
        }

        const tests: ITest[] = await responseTests.json();
        const sites: ISite[] = await responseSites.json();

        setData({ tests, sites });
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCombinedData;
