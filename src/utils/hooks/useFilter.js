import { useEffect, useState } from 'react';

let globalFilters = {};
let observers = [];

const setFilter = (route) => {
  globalFilters = route;
  observers.forEach((updater) => updater(globalFilters));
};

const useFilter = () => {
  const [currentFilters, setCurrentFilters] = useState(globalFilters);

  useEffect(() => {
    observers.push(setCurrentFilters);
    setCurrentFilters(globalFilters);

    return () => {
      observers = observers.filter((updater) => updater !== setCurrentFilters);
    };
  }, []);

  return [currentFilters, setFilter];
};

export default useFilter;
