import { useEffect, useState } from 'react';

let globalRoute = '/';
let observers = [];

const setRoute = route => {
  globalRoute = route;
  observers.forEach(updater => updater(globalRoute));
  window.scrollTo(0, 0);
};

const useRoute = () => {
  const [currentRoute, setCurrentRoute] = useState(globalRoute);

  useEffect(() => {
    observers.push(setCurrentRoute);
    setCurrentRoute(globalRoute);

    return () => {
      observers = observers.filter(updater => updater !== setCurrentRoute);
    };
  }, []);

  return [currentRoute, setRoute];
};

export default useRoute;
