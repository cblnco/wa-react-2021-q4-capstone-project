import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ContentContainer from '../ContentContainer';

const ShoppingContainer = styled.div`
  margin-top: 4rem;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

/**
 * 3.2.1. There should be a row in this table per item/product in the cart.
 * 3.2.2. Each row should show the main image of the product, its name, unit price, a quantity selector, subtotal (unit price x quantity) and a “remove from cart icon”.
 * 3.2.3. At the bottom of the table there should be a label to display the cart total (sum of the subtotal’s column in the table) and a “Proceed to checkout” button that will serve as a link to navigate to the “Checkout Page” after clicking on it.
 * 3.2.4. You should be able to modify the quantity of items that you want using the quantity selector. Please don’t forget to validate that you don’t exceed the stock units available for the selected product.
 * 3.2.5. After updating the quantity the subtotal for the product and the cart total labels should be updated.
 */

const Cart = () => {
  const { shoppingCart, totalUnits, totalPrice } = useSelector(
    state => state.cart
  );

  return (
    <ContentContainer>
      <ShoppingContainer>
        <Title>Shopping Cart</Title>
      </ShoppingContainer>
    </ContentContainer>
  );
};

export default Cart;
