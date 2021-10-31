import { useEffect, useState } from 'react';
import { useLatestAPI } from './useLatestAPI';
import axios from 'axios';
import {
  API_BASE_URL,
  BANNERS,
  CATEGORIES,
  FEATURED_PRODS,
} from '../constants';

const INITIAL_STATE = {
  data: {},
  isLoading: true,
};

const queries = {
  [BANNERS]: `${encodeURIComponent(
    '[[at(document.type, "banner")]]'
  )}&lang=en-us&pageSize=5`,
  [CATEGORIES]:
    '%5B%5Bat(document.type%2C%20%22category%22)%5D%5D&lang=en-us&pageSize=30',
  [FEATURED_PRODS]:
    '%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bat(document.tags%2C%20%5B%22Featured%22%5D)%5D%5D&lang=en-us&pageSize=16',
};

const usePrismicAPI = type => {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [prismicResponse, setPrismicResponse] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const CancelToken = axios.CancelToken;
    const cancelSource = CancelToken.source();

    async function getCategories() {
      setPrismicResponse(INITIAL_STATE);

      try {
        const { data, status } = await axios(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${queries[type]}`,
          {
            cancelToken: cancelSource.token,
          }
        );

        const response = status !== 200 ? {} : data;
        setPrismicResponse({ data: response, isLoading: false });
      } catch (err) {
        setPrismicResponse({ data: {}, isLoading: false });
      }
    }

    getCategories();

    return () => {
      cancelSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRef, isApiMetadataLoading]);

  return prismicResponse;
};

export { usePrismicAPI, BANNERS, CATEGORIES, FEATURED_PRODS };
