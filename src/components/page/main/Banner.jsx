import React from "react";

import styled from "styled-components";

import banner from "static/img/specialBanner.jpg";

const BannerContainer = styled.div`
  width: 100%;
  height: 700px;
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;
`;

const BannerBlur = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.8);
`;

const BannerTitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  text-align: center;

  transform: translate(-50%, -50%);
`;

const BannerTitle = styled.span`
  font-size: 43px;
  font-weight: 400;

  display: block;

  color: rgba(255, 255, 255, 0.5);
`;

const BannerSubTitle = styled.span`
  font-size: 15px;
  font-weight: 100;

  display: block;

  color: rgba(255, 255, 255, 0.5);
`;

const Banner = () => {
  return (
    <BannerContainer>
      <BannerImageWrapper>
        <BannerImage src={banner} />
        <BannerBlur />
        <BannerTitleWrapper>
          <BannerTitle>1854일의 기적</BannerTitle>
          <BannerSubTitle>B'Girls Are Back! "안녕하세요, 브레이브걸스입니다!"</BannerSubTitle>
        </BannerTitleWrapper>
      </BannerImageWrapper>
    </BannerContainer>
  );
};

export default Banner;
