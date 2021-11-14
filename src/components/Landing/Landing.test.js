import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import banners from '../../mocks/en-us/featured-banners.json';
import products from '../../mocks/en-us/featured-products.json';
import categories from '../../mocks/en-us/product-categories.json';
import Landing from '.';

describe('Homepage functionality', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Landing />
        </Router>
      </Provider>
    );
  });

  it('Should render banners from API', () => {
    banners.results.forEach(async ({ data: { title } }) => {
      const uiText = title.split('-')[0];
      expect(await screen.findByText(uiText)).toBeInTheDocument();
    });
  });

  it('Should render categories from API', () => {
    categories.results.forEach(async ({ data: { name } }) => {
      expect(await screen.findByText(name)).toBeInTheDocument();
    });
  });

  it('Should render featured products from API', async () => {
    const {
      data: { name },
    } = products.results[0];
    expect(await screen.findByText(name)).toBeInTheDocument();
  });
});
