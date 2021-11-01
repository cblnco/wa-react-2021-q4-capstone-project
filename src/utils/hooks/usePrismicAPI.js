import { useEffect, useState } from 'react';
import { useLatestAPI } from './useLatestAPI';
import axios from 'axios';
import {
  API_BASE_URL,
  BANNERS_QUERY,
  CATEGORIES_QUERY,
  FEATURED_PRODS_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_QUERY,
} from '../constants';

const INITIAL_STATE = {
  data: {},
  isLoading: true,
};

const usePrismicAPI = query => {
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
        const apiURL = `${API_BASE_URL}/documents/search?ref=${apiRef}`;
        console.log(apiURL);
        const { data, status } = await axios(`${apiURL}&q=${query}`, {
          cancelToken: cancelSource.token,
        });

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

export {
  usePrismicAPI,
  BANNERS_QUERY,
  CATEGORIES_QUERY,
  FEATURED_PRODS_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_QUERY,
};
