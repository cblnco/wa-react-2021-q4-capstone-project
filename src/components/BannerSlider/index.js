import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  padding-top: 4rem;

  .slick-dots {
    width: unset;
    bottom: 1.5rem;
    right: 1rem;
  }
  .slick-dots li button::before {
    font-size: 17px;
    color: white;
  }
`;

const Banner = styled.img`
  max-height: 45vh;
  min-height: 35rem;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.div`
  color: white;
  z-index: 2;
  position: absolute;
  bottom: 1.5rem;
  left: 1rem;
  font-size: 20px;
  font-weight: 900;
`;

const Gradient = styled.div`
  width: 100%;
  height: 25%;
  position: absolute;
  z-index: 1;
  bottom: 4px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), black 115%);
`;

const BannerSlider = ({ banners = [], transitionTime = 5000 }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: transitionTime,
  };

  return (
    <Container>
      <Slider {...sliderSettings}>
        {banners.map(
          ({
            id,
            data: {
              title,
              main_image: { url, alt },
            },
          }) => (
            <div key={`banner-slide-${id}`}>
              <Title>{title.split('-')[0]}</Title>
              <Gradient />
              <Banner src={url} alt={alt} />
            </div>
          )
        )}
      </Slider>
    </Container>
  );
};

export default BannerSlider;
