import React from 'react';
import { Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { deleteProduct, updateQuantity } from '../../redux/slices/cart';
import ContentContainer from '../ContentContainer';
import { Units } from '../Products/Detail/Quantity';
import { CartButton } from '../Products/List';

const ShoppingContainer = styled.div`
  margin-top: 4rem;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  min-width: 10rem;
  margin-bottom: 2rem;
`;

const ProductImage = styled.img`
  height: 16rem;
  width: 100%;
  border: solid 1px #cbc8c1;
  object-fit: contain;
  background: white;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const Name = styled.div`
  font-size: 24px;
  color: #45433f;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem 0;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 0.2rem 0;
  margin-bottom: 1rem;
`;

const Subtotal = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
`;

const Summary = styled.div`
  position: relative;
  border: solid 1px #cbc8c1;
  padding: 1rem;
  background: white;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  color: #6b665c;
  background-color: #e7deca;
  border: 0;
  border-left: 1px solid #cbc8c1;
  border-bottom: 1px solid #cbc8c1;
  cursor: pointer;
  padding: 0.5rem;
`;

const ProductRows = styled.div`
  min-height: 23rem;
`;

const NoProducts = styled.div`
  font-size: 21px;
`;

const Checkout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
`;

const Total = styled.div`
  font-size: 25px;
  display: flex;
  font-weight: bold;
  justify-content: end;
  margin-bottom: 2rem;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shoppingCart, totalPrice } = useSelector(state => state.cart);
  const productKeys = Object.keys(shoppingCart);

  const changeQuantity = (id, increment) =>
    dispatch(updateQuantity({ id, increment }));

  return (
    <ContentContainer>
      <ShoppingContainer>
        <Title>Shopping Cart</Title>
        {productKeys.length === 0 && (
          <NoProducts>You don't have products on your cart</NoProducts>
        )}
        {productKeys.length > 0 && (
          <ProductRows>
            {productKeys.map(key => {
              const {
                id,
                name,
                stock,
                mainImage: { url, alt },
                price,
                quantity,
                subtotal,
              } = shoppingCart[key];

              return (
                <ProductContainer key={`cart-product-${id}-row`}>
                  <ProductImage src={url} alt={alt} />
                  <Summary>
                    <Name>{name}</Name>
                    <Price>Unit price: {`$${price}`}</Price>
                    <Units
                      isUpDisabled={stock === quantity}
                      isDownDisabled={quantity === 0}
                      quantity={quantity}
                      changeQuantity={inc => changeQuantity(id, inc)}
                    />
                    <Subtotal>Subtotal: {`$${subtotal.toFixed(2)}`}</Subtotal>
                    <DeleteButton
                      onClick={() => dispatch(deleteProduct({ id }))}
                    >
                      <Trash2 size="26" />
                    </DeleteButton>
                  </Summary>
                </ProductContainer>
              );
            })}
          </ProductRows>
        )}
        {productKeys.length > 0 && (
          <>
            <Total>Total: {`$${totalPrice.toFixed(2)}`}</Total>
            <Checkout>
              <div />
              <CartButton isActive onClick={() => history.push('/checkout')}>
                Proceed to checkout
              </CartButton>
            </Checkout>
          </>
        )}
      </ShoppingContainer>
    </ContentContainer>
  );
};

export default React.memo(Cart);
