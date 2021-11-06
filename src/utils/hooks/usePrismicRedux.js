import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrismicAPI } from './usePrismicAPI';

const usePrismicRedux = (stateName, query, slice) => {
  const state = useSelector(state => state[stateName]);
  const dispatch = useDispatch();

  const { data, isLoading } = usePrismicAPI(query);

  useEffect(() => {
    dispatch(slice({ data, isLoading }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return state;
};

export default usePrismicRedux;
