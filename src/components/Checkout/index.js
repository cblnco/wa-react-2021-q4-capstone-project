import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ContentContainer from '../ContentContainer';
import { CartButton } from '../Products/List';

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

const Content = styled.div`
  margin-top: 4rem;
`;

const CheckoutContainer = styled.div`
  display: grid;
  margin-top: 4rem;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
`;

const FormContainer = styled.div`
  padding: 1rem 0;

  * {
    display: block;
  }
`;

const FieldContainer = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: #696358;
`;

const Input = styled.input`
  height: 2.2rem;
  border: 0;
  color: #3d3b39;
  border-bottom: 1px solid #d5bf9d;
  background-color: transparent;
  font-size: 17px;

  ::placeholder {
    color: #777676;
    font-style: italic;
    font-size: 17px;
  }
`;

const Notes = styled.textarea`
  width: 85%;
  height: 9rem;
  resize: none;
  border: 1px solid #d5bf9d;
  color: #3d3b39;
  font-size: 17px;

  ::placeholder {
    color: #777676;
    font-style: italic;
    font-size: 17px;
  }
`;

const OrderTitle = styled.div`
  font-size: 22px;
  margin-bottom: 1.5rem;
`;

const NoProducts = styled.div`
  font-size: 21px;
`;

const ProductSummary = styled.div`
  padding: 1rem;
  background-color: #d8d6d2;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
  margin-bottom: 0.7rem;

  * {
    margin-bottom: 0.5rem;
    font-size: 18px;
    color: #47443e;
  }
`;

const Total = styled.div`
  font-size: 25px;
  display: flex;
  font-weight: bold;
  justify-content: end;
  margin: 3rem 0;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
`;

const Checkout = () => {
  const [formState, setFormState] = useState({
    customer: '',
    email: '',
    zipcode: '',
    notes: '',
  });

  const history = useHistory();
  const { customer, email, zipcode, notes } = formState;
  const { shoppingCart, totalPrice } = useSelector((state) => state.cart);
  const productKeys = Object.keys(shoppingCart);

  const handleOnChange = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    setFormState((formState) => ({
      ...formState,
      [fieldName]: value,
    }));
  };

  return (
    <ContentContainer>
      <Content>
        <Title>Checkout</Title>
        {productKeys.length > 0 ? (
          <CheckoutContainer>
            <FormContainer>
              <FieldContainer>
                <Label>Name:</Label>
                <Input
                  name="customer"
                  value={customer}
                  placeholder="Place your name"
                  style={{ width: '40%' }}
                  onChange={handleOnChange}
                />
              </FieldContainer>
              <FieldContainer>
                <Label>Email:</Label>
                <Input
                  name="email"
                  value={email}
                  placeholder="johndoe@mail.com"
                  style={{ width: '35%' }}
                  onChange={handleOnChange}
                />
              </FieldContainer>
              <FieldContainer>
                <Label>zip code:</Label>
                <Input
                  name="zipcode"
                  value={zipcode}
                  placeholder="zip/postal code"
                  onChange={handleOnChange}
                />
              </FieldContainer>
              <FieldContainer>
                <Label>Oder notes:</Label>
                <Notes
                  name="notes"
                  value={notes}
                  placeholder="Apt suite, handling, delivery"
                  onChange={handleOnChange}
                />
              </FieldContainer>
            </FormContainer>
            <div>
              <OrderTitle>Order Summary:</OrderTitle>
              {productKeys.map((key) => {
                const { id, name, quantity, subtotal } = shoppingCart[key];
                return (
                  <ProductSummary key={`product-${id}-summary`}>
                    <div>{name}</div>
                    <div>Quantity: {quantity}</div>
                    <div>Subtotal: {`$${subtotal}`}</div>
                  </ProductSummary>
                );
              })}
              <Total>Cart total: {`$${totalPrice.toFixed(2)}`}</Total>
              <ButtonContainer>
                <CartButton isActive onClick={() => history.push('/cart')}>
                  Go back to cart
                </CartButton>
                <CartButton>Place order</CartButton>
              </ButtonContainer>
            </div>
          </CheckoutContainer>
        ) : (
          <NoProducts>You don't have any products to checkout</NoProducts>
        )}
      </Content>
    </ContentContainer>
  );
};

export default Checkout;
