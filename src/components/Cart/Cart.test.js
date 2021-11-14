import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Cart from '.';
import { addToCart, deleteProduct } from '../../redux/slices/cart';
import cartProducts from './fixtures/cartProducts';

describe('Homepage functionality', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );
  };

  const dispatchProducts = () => {
    store.dispatch(addToCart({ cartProduct: cartProducts[0] }));
    store.dispatch(addToCart({ cartProduct: cartProducts[1] }));
  };

  const removeProducts = () => {
    store.dispatch(deleteProduct({ id: cartProducts[0].id }));
    store.dispatch(deleteProduct({ id: cartProducts[1].id }));
  };

  it('Should render message on empty shopping cart', async () => {
    renderComponent();
    expect(
      screen.getByText("You don't have products on your cart")
    ).toBeInTheDocument();
  });

  it('Should render product rows with information', () => {
    dispatchProducts();
    renderComponent();

    cartProducts.forEach(({ id, name, mainImage: { alt }, subtotal }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByAltText(alt)).toBeInTheDocument();
      expect(screen.getByText(`Subtotal: $${subtotal}`)).toBeInTheDocument();
      expect(screen.getByLabelText(`quantity-${id}-input`)).toBeInTheDocument();
      expect(screen.getByLabelText(`delete-${id}-button`)).toBeInTheDocument();
    });

    removeProducts();
  });

  it('Validate sum of subtotals', () => {
    const expectedTotal = cartProducts[0].subtotal + cartProducts[1].subtotal;
    dispatchProducts();
    renderComponent();

    expect(screen.getByText(`Total: $${expectedTotal}`)).toBeInTheDocument();

    removeProducts();
  });

  it('Should validate product quantitites', () => {
    const { id, stock } = cartProducts[0];
    dispatchProducts();
    renderComponent();

    const lessButton = screen.getByLabelText(`less-${id}-button`);
    const moreButton = screen.getByLabelText(`more-${id}-button`);
    const quantityInput = screen.getByLabelText(`quantity-${id}-input`);

    fireEvent.click(moreButton);
    expect(quantityInput).toHaveDisplayValue('2');

    fireEvent.click(lessButton);
    expect(quantityInput).toHaveDisplayValue('1');

    for (let i = 1; i < stock; i++) {
      fireEvent.click(moreButton);
    }

    expect(moreButton).toBeDisabled();
    removeProducts();
  });

  it('Should remove a product from the shopping cart', () => {
    const { id } = cartProducts[0];
    dispatchProducts();
    renderComponent();

    const deleteButton = screen.getByLabelText(`delete-${id}-button`);

    fireEvent.click(deleteButton);
    expect(
      screen.getByText(`Total: $${cartProducts[1].subtotal}`)
    ).toBeInTheDocument();
  });
});
