import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled from "styled-components";

import Slider from "react-slick";
import { onDownload, photocardService } from "../../../service/photocardService";

import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

const CardSectionContainer = styled.div`
  width: 100%;
  height: 550px;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const CardSectionTitleWrapper = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardSectionLeft = styled.div``;

const CardSectionTitle = styled.h1`
  font-size: 15px;
  color: rgba(194, 177, 155);
`;

const CardSectionSubTitle = styled.h1`
  font-size: 25px;
`;

const CardSectionRight = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
  padding: 0px 0px;
`;

const CardWrapper = styled.div`
  width: 230px;
  padding: 15px 0px;
  position: relative;
`;

const CardImage = styled.img`
  width: 230px;
  display: block;
  border-radius: 8px;

  position: relative;

  box-shadow: rgba(0, 0, 0, 0.12) 2px 3px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  /* &:hover {
    transform: translateY(-10px);
  }

  transition: transform 0.5s ease;
  cursor: pointer; */
`;

const CardDescriptionArea = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 0px;
`;

const CardDescriptionTitle = styled.h1`
  font-size: 15px;
  display: block;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.h1`
  font-size: 20px;
`;

const CustomSlider = styled(Slider)`
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성

    padding-right: 10px;
  }

  .slick-prev {
    z-index: 5;
  }

  .slick-next {
    z-index: 5;
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
    autoplaySpeed: 3000,
  };

  const gubunArr = ["# RED SUN", "# MVSK"];

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
      <CardSectionTitleWrapper>
        <CardSectionLeft>
          <CardSectionTitle>PhotoCard</CardSectionTitle>
          <CardSectionSubTitle>Download File List</CardSectionSubTitle>
        </CardSectionLeft>
        <CardSectionRight>
          {_.map(gubunArr, (gubun, index) => (
            <CardSectionGubun key={index} onClick={loadData}>
              {gubun}
            </CardSectionGubun>
          ))}
        </CardSectionRight>
      </CardSectionTitleWrapper>

      <CardSectionWrapper>
        {loading ? (
          <CustomSlider {...settings}>
            {_.map(photoCard, (card, index) => (
              <CardWrapper key={Number(index)}>
                <a href={card.photocard_image} download onClick={(e) => onDownload(e, card.member_name, card.photocard_name)}>
                  <CardImage src={card.photocard_image} download={card.photocard_name} />
                </a>
                <CardDescriptionArea>
                  <CardDescriptionTitle>{card.photocard_name}</CardDescriptionTitle>
                </CardDescriptionArea>
              </CardWrapper>
            ))}
          </CustomSlider>
        ) : (
          <LoadingWrapper>
            <LoadingText>Loading...</LoadingText>
          </LoadingWrapper>
        )}
      </CardSectionWrapper>
    </CardSectionContainer>
  );
};

export default CardSection;
