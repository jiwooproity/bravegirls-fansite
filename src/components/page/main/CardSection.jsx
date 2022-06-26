import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled from "styled-components";

import { onDownload, photocardService } from "service/photocardService";
import { SectionTitle, Loading } from "components";

import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

const CardSectionContainer = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardSectionGubun = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: rgba(194, 177, 185);
  color: white;
  cursor: pointer;
`;

const CardSectionWrapper = styled.div`
  width: 990px;
`;

const CardWrapper = styled.div`
  width: 230px;
  height: 356px;
  margin: 15px 0px;
  display: block;
  position: relative;
`;

const CardAnchor = styled.a`
  width: 230px;
  height: 356px;
  position: relative;

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
  width: 230px;
  height: 356px;

  display: block;
  border-radius: 8px;

  position: absolute;
  top: 0;

  box-shadow: rgba(0, 0, 0, 0.12) 2px 3px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

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
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성

    padding-right: 10px;
  }

  .slick-prev {
    z-index: 5;
    height: 356px;
    border-radius: 15px 0px 0px 15px;

    &:hover {
      background-color: rgba(220, 220, 220);
    }

    transition: background-color 0.5s ease;

    &::before {
      display: none;
    }
  }

  .slick-next {
    z-index: 5;
    height: 356px;
    border-radius: 0px 15px 15px 0px;

    &:hover {
      background-color: rgba(220, 220, 220);
    }

    transition: background-color 0.5s ease;

    &::before {
      display: none;
    }
  }
`;

const CardSection = () => {
  const [photoCard, setPhotoCard] = useState([]);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "-10px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const gubunArr = [
    {
      label: "# RED SUN",
      url: "https://drive.google.com/u/0/uc?id=1_s3ntkw9ikFaqVDJ8mklAGjSSYkeUXOX&export=download",
    },
    {
      label: "# MVSK",
      url: "https://drive.google.com/u/0/uc?id=1MiEdK4Sj0eLRXAdOrkSuS-0vDdV2_0va&export=download",
    },
  ];

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
    <CardSectionContainer>
      <SectionTitle title="PhotoCard" subTitle={`다운 받을 시안을 클릭해주세요! (${photoCard.length})`}>
        {_.map(gubunArr, (gubun, index) => (
          <a key={index} href={gubun.url} target={"_blank"} rel="noreferrer">
            <CardSectionGubun key={index}>{gubun.label}</CardSectionGubun>
          </a>
        ))}
      </SectionTitle>

      <CardSectionWrapper>
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
      </CardSectionWrapper>
    </CardSectionContainer>
  );
};

export default CardSection;
