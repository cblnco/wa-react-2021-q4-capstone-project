import { useEffect, useState } from 'react';
import { useLatestAPI } from './useLatestAPI';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const INITIAL_STATE = {
  data: {},
  isLoading: true,
};

const useCategories = () => {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [categories, setCategories] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const CancelToken = axios.CancelToken;
    const cancelSource = CancelToken.source();

    async function getCategories() {
      try {
        setCategories(INITIAL_STATE);

        const { data } = await axios(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=%5B%5Bat(document.type%2C%20%22category%22)%5D%5D&lang=en-us&pageSize=30`,
          {
            cancelToken: cancelSource.token,
          }
        );

        setCategories({ data, isLoading: false });
      } catch (e) {
        console.log(e);
        setCategories({ data: {}, isLoading: false });
      }
    }

    getCategories();

    return () => {
      cancelSource.cancel();
    };
  }, [apiRef, isApiMetadataLoading]);

  return categories;
};

export default useCategories;
