import React from 'react';
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
import Description from './Description';
import Quantity from './Quantity';
import Specs from './Specs';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slices/cart';

const DetailContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin-top: 6rem;
  margin-bottom: 4rem;

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

const ThumbPage = styled.img`
  width: 3rem;
  height: 4rem;
`;

const MainImage = styled.img`
  max-height: 51vh;
  min-height: 35rem;
  width: 100%;
  object-fit: contain;
`;

const Detail = () => {
  const { productId } = useParams();
  const query = PRODUCT_QUERY.replace('{productId}', productId);
  const dispatch = useDispatch();
  const { shoppingCart } = useSelector((state) => state.cart);
  const { data, isLoading } = usePrismicAPI(query);

  if (isLoading) {
    return null;
  }

  const {
    id,
    data: {
      name,
      price,
      sku,
      stock,
      images,
      mainimage,
      category,
      short_description,
      specs,
    },
    tags,
  } = data.results[0];

  const productQuantity = shoppingCart[id] ? shoppingCart[id].quantity : 0;

  const onCartDispatch = (quantity) => {
    const { url, alt } = mainimage;
    dispatch(
      addToCart({
        cartProduct: {
          id,
          name,
          stock,
          mainImage: { url, alt },
          price,
          quantity,
          subtotal: price * quantity,
        },
      })
    );
  };

  const settings = {
    customPaging: (i) => {
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

  return (
    <ContentContainer>
      <DetailContainer>
        <Slider {...settings}>
          {images.map(({ image: { alt, url } }) => (
            <MainImage key={`product-${id}-img`} src={url} alt={alt} />
          ))}
        </Slider>
        <div>
          <Description
            name={name}
            sku={sku}
            category={category}
            shortDescription={short_description}
            price={price}
            tags={tags}
          />
          <Quantity
            prodId={id}
            stock={stock}
            productQuantity={productQuantity}
            onCartDispatch={onCartDispatch}
          />
        </div>
      </DetailContainer>
      <Specs specs={specs} />
    </ContentContainer>
  );
};

export default Detail;
