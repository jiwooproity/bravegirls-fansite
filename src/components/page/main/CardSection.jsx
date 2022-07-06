import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled from "styled-components";

import { onDownload, photocardService } from "service/photocardService";
import { Loading, SectionComponent } from "components";

import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

const Section = styled.div`
  width: 100%;
  padding: 50px 0px 100px 0px;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;

  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`;

const CardWrapper = styled.div`
  display: block;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CardAnchor = styled.a`
  transform-style: preserve-3d;
  perspective: 1000px;

  img:nth-child(2) {
    transform: rotateY(180deg);
  }

  &:hover {
    img:nth-child(1) {
      transform: rotateY(-180deg);
    }

    img:nth-child(2) {
      transform: rotateY(0deg);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;

  display: block;
  border-radius: 8px;

  &:nth-child(2) {
    position: absolute;
    top: 0;
  }

  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  backface-visibility: hidden;
  transform: 1s;

  transition: transform 0.5s ease;
  cursor: pointer;
`;

// const CardDescriptionArea = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 5px 0px;
// `;

// const CardDescriptionTitle = styled.h1`
//   font-size: 15px;
//   display: block;
// `;

const CustomSlider = styled(Slider)`
  .slick-list {
  }

  .slick-slide {
    pointer-events: none;
    opacity: 0.5;
    padding: 25px 10px 40px 10px;
    transform: scale(0.9);
    transition: transform 0.5s ease, opacity 0.5s ease;

    @media screen and (max-width: 768px) {
      padding: 25px 30px 40px 30px;
    }
  }

  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  }

  .slick-center {
    pointer-events: all;
    opacity: 1;
    transform: scale(1.1);
    @media screen and (max-width: 768px) {
      transform: scale(1);
    }
  }

  .slick-prev {
    &::before {
      display: none;
    }
  }

  .slick-next {
    &::before {
      display: none;
    }
  }
`;

const CardSection = () => {
  const [photoCard, setPhotoCard] = useState([]);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // const gubunArr = [
  //   {
  //     label: "# RED SUN",
  //     url: "https://drive.google.com/u/0/uc?id=1_s3ntkw9ikFaqVDJ8mklAGjSSYkeUXOX&export=download",
  //   },
  //   {
  //     label: "# MVSK",
  //     url: "https://drive.google.com/u/0/uc?id=1MiEdK4Sj0eLRXAdOrkSuS-0vDdV2_0va&export=download",
  //   },
  // ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);

    const response = await photocardService.getPhotocardData();

    setPhotoCard(response);
    setLoading(true);
  };

  return (
    <Section>
      <SectionComponent width={1360} title={"브레이브걸스"} active={"포토카드"} subTitle={"각 멤버들의 개성을 살린 포토카드 구경하고 가세요!"}>
        {loading ? (
          <CustomSlider {...settings}>
            {_.map(photoCard, (card, index) => (
              <CardWrapper key={Number(index)}>
                <CardAnchor
                  style={{ outline: "none" }}
                  href={card.photocard_image}
                  download
                  onClick={(e) => onDownload(e, card.member_name, card.photocard_name, card.photocard_image, card.photocard_image_back)}
                >
                  <CardImage src={card.photocard_image} download={card.photocard_name} />
                  <CardImage src={card.photocard_image_back} download={card.photocard_name} />
                </CardAnchor>
              </CardWrapper>
            ))}
          </CustomSlider>
        ) : (
          <Loading />
        )}
      </SectionComponent>
    </Section>
  );
};

export default CardSection;
