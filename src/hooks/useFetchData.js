import { useState, useEffect } from 'react';

/**
 * Custom hook to handle data fetching generically with loading and error states.
 * @param {Function} fetchFunction - A function returning a Promise (e.g., from apiClient).
 * @param {Array} dependencies - Dependencies to re-trigger the fetch.
 * @param {any} initialData - Default data while loading.
 */
export const useFetchData = (fetchFunction, dependencies = [], initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchFunction()
      .then((resData) => {
        if (isMounted) {
          setData(resData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Data fetch error:", err);
          setError(err.message || 'Failed to fetch data');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData };
};
