import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import products from '../../../mocks/en-us/products.json';
import categories from '../../../mocks/en-us/product-categories.json';
import Catalog from '.';

describe('Product list functionality', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Catalog />
        </Router>
      </Provider>
    );
  });

  it('Should show sidebar with categories from API', () => {
    categories.results.forEach(async ({ data: { name } }) => {
      expect(await screen.findByText(name)).toBeInTheDocument();
    });
  });

  it('Should filter products correctly', async () => {
    const {
      data: { name },
    } = categories.results[0];
    const filter = await screen.findByText(name);

    const {
      data: { name: productName },
    } = products.results[0];

    expect(await screen.findByText(productName)).toBeInTheDocument();

    fireEvent.click(filter);
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  it('Should generate pagination correctly', () => {
    const { totalPages } = products;
    const pages = new Array(totalPages).fill();

    pages.forEach(async (_, idx) =>
      expect(await screen.findByText(idx + 1)).toBeInTheDocument()
    );
  });

  /*
  it('Should disable buttons accordingly', async () => {
    const prevButton = await screen.findByRole('button', {
      name: 'prev-btn',
    });
    const nextButton = await screen.findByRole('button', {
      name: 'next-btn',
    });
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });*/
});
