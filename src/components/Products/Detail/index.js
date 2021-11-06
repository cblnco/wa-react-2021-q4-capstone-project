import React, { useState } from 'react';
import { useParams } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  usePrismicAPI,
  PRODUCT_QUERY,
} from '../../../utils/hooks/usePrismicAPI';
import ContentContainer from '../../ContentContainer';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'react-feather';

const DetailContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin-top: 6rem;

  .slick-slider {
    overflow: hidden;
    border: solid 1px #cbc8c1;
    box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.25);
  }

  .slick-arrow {
    display: none;
  }

  .slick-dots {
    bottom: 0px;
    padding: 0.3rem 0;
    background-color: white;
    border-top: solid 1px #cbc8c1;

    li {
      width: 3rem;
      margin: 0 10px;
    }
  }
`;

const Title = styled.div`
  font-size: 34px;
  margin-bottom: 0.2rem;
`;

const ThumbPage = styled.img`
  width: 3rem;
  height: 4rem;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

const Sku = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Category = styled.div`
  background-color: #e1dfdc;
  width: 88%;
  padding: 0.3rem;
  font-size: 17px;
  color: #7e7b77;
  margin-right: 0.3rem;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  color: #74716e;
  width: 87%;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  background-color: white;
  border: 2px solid #cbc8c1;
  height: 2.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  height: 2rem;
  width: 5rem;
  color: #767472;
  font-size: 20px;
  border-top: 2px solid #cbc8c1;
  vertical-align: top;
  border-bottom: 2px solid #cbc8c1;
  border-left: 0;
  border-right: 0;
  text-align: center;
`;

const Quantity = styled.div`
  font-size: 20px;
  color: #413f3c;
  margin-bottom: 2rem;
`;

const TagsTitle = styled.div`
  color: #413f3c;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;

const Tag = styled.div`
  color: #6e6c69;
  font-size: 15px;
  padding: 0.3rem;
  text-align: center;
  margin-right: 0.5rem;
  background-color: #f9ece1;
`;

const AddToCart = styled.div`
  margin-bottom: 3rem;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);
  width: 9.8rem;
`;

const MainImage = styled.img`
  max-height: 51vh;
  min-height: 35rem;
  width: 100%;
  object-fit: contain;
`;

const CartButton = styled.button`
  width: 25vw;
  min-width: 12rem;
  padding: 0.6rem;
  font-size: 21px;
  background-color: #d3c8b4;
  border: 1px solid #aaa79f;
  color: #474645;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);

  &:hover {
    color: #52504f;
    background-color: #d9ccb3;
    border: solid 1px #b5b3ad;
  }

  &:active {
    color: #3e3d3d;
    margin-left: 1px;
    background-color: #cabfab;
  }
`;

const Detail = () => {
  const { productId } = useParams();
  const query = PRODUCT_QUERY.replace('{productId}', productId);
  const { data, isLoading } = usePrismicAPI(query);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return null;
  }

  const {
    data: {
      id,
      name,
      price,
      sku,
      stock,
      images,
      category,
      short_description,
      specs,
    },
    tags,
  } = data.results[0];

  const settings = {
    customPaging: i => {
      const {
        image: { alt, url },
      } = images[i];
      return <ThumbPage key={`product-${id}-img-page`} src={url} alt={alt} />;
    },
    fade: true,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(data);

  const onQuantityChange = ({ target: { validity, value } }) => {
    const quantity = validity.valid ? value : 1;
    setQuantity(Number(quantity));
  };

  return (
    <ContentContainer>
      <DetailContainer>
        <Slider {...settings}>
          {images.map(({ image: { alt, url } }) => (
            <MainImage key={`product-${id}-img`} src={url} alt={alt} />
          ))}
        </Slider>
        <div>
          <Title>{name}</Title>
          <Sku>SKU: {sku}</Sku>
          <Category>{category.slug}</Category>
          <Description>{short_description}</Description>
          <Price>{`$${price}`}</Price>
          <TagsTitle>Tags</TagsTitle>
          <TagsContainer>
            {tags.map(tag => (
              <Tag key={`product-${tag}-tags`}>{tag}</Tag>
            ))}
          </TagsContainer>
          <Quantity>QUANTITY</Quantity>
          <AddToCart>
            <Button>
              <ChevronDown color="#767472" />
            </Button>
            <Input
              type="text"
              value={quantity}
              pattern="[0-9*]"
              onInput={onQuantityChange}
            />
            <Button>
              <ChevronUp color="#767472" />
            </Button>
          </AddToCart>
          <CartButton>Add to cart</CartButton>
        </div>
      </DetailContainer>
    </ContentContainer>
  );
};

export default Detail;
