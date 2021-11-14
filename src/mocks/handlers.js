import { rest } from 'msw';
import { API_BASE_URL } from '../utils/constants';
import apiMock from './api/v2.json';
import banners from './en-us/featured-banners.json';
import featuredProds from './en-us/featured-products.json';
import categories from './en-us/product-categories.json';
import products from './en-us/products.json';
import specificProduct from './en-us/specific-product.json';
import emptyResponse from './en-us/empty-result.json';

const handlers = [
  rest.get(API_BASE_URL, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(apiMock))
  ),
  rest.get(`${API_BASE_URL}/documents/search`, (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const q = searchParams.getAll('q');
    let response = {};

    if (q[0].includes('banner')) {
      response = banners;
    }

    if (q[0].includes('category')) {
      response = categories;
    }

    if (q[0].includes('document.id')) {
      response = specificProduct;
    }

    if (q[0].includes('product')) {
      response = products;

      if (q.length > 1) {
        if (q[1].includes('Featured')) {
          response = featuredProds;
        }

        if (q[1].includes('none')) {
          response = emptyResponse;
        }
      }
    }

    return res(ctx.status(200), ctx.json(response));
  }),
];

export { handlers };
