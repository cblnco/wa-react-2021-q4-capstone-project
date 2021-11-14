import { screen, render, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import specificProduct from '../../../mocks/en-us/specific-product.json';
import Detail from '.';

describe('Homepage functionality', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Detail />
        </Router>
      </Provider>
    );
  });

  it('Should render product from API', async () => {
    const {
      data: { name },
    } = specificProduct.results[0];
    expect(await screen.findByText(name)).toBeInTheDocument();
  });

  it('Should render product details', async () => {
    const {
      tags,
      data: {
        name,
        sku,
        price,
        short_description,
        category: { slug },
      },
    } = specificProduct.results[0];
    expect(await screen.findByText(name)).toBeInTheDocument();
    expect(await screen.findByText(`SKU: ${sku}`)).toBeInTheDocument();
    expect(await screen.findByText(`$${price}`)).toBeInTheDocument();
    expect(await screen.findByText(short_description)).toBeInTheDocument();
    expect(await screen.findByText(slug)).toBeInTheDocument();
    expect(await screen.findByText(tags[0])).toBeInTheDocument();
  });

  it('Should render quantity selector and add to cart button', async () => {
    const { id } = specificProduct.results[0];
    expect(
      await screen.findByLabelText(`quantity-${id}-input`)
    ).toBeInTheDocument();
    expect(await screen.findByText('Add to cart')).toBeInTheDocument();
  });

  it('Verify if add to cart button gets disabled', async () => {
    const {
      data: { stock },
    } = specificProduct.results[0];
    const clicks = new Array(stock).fill();
    const addToCartButton = await screen.findByText('Add to cart');
    clicks.forEach(() => fireEvent.click(addToCartButton));
    expect(addToCartButton).toBeDisabled();
  });
});
