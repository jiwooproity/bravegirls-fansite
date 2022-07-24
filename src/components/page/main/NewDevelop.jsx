import React from "react";
import styled from "styled-components";

import weRideImage from "static/img/weride_1.png";
import background from "static/img/bravegirls_first.jpg";

const MainBanner = styled.div`
  width: 100%;
  height: 100vh;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 0px 30px;
  }
`;

const MainBannerBackground = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;
`;

const MainBannerBottom = styled.div`
  width: 100%;
  height: 50%;

  position: absolute;
  bottom: 0;

  background-color: rgba(15, 15, 15, 0.8);

  @keyframes ScrollHeight {
    0% {
      height: 100%;
    }

    100% {
      height: 50%;
    }
  }

  animation-duration: 3s;
  animation-name: "ScrollHeight";
`;

const MainBannerTop = styled.div`
  width: 100%;
  height: 50%;

  position: absolute;
  top: 0;

  background-color: rgba(255, 255, 255, 0.9);

  @keyframes ScrollHeight {
    0% {
      height: 100%;
    }

    100% {
      height: 50%;
    }
  }

  animation-duration: 3s;
  animation-name: "ScrollHeight";
`;

const MainBannerBottomImageWrap = styled.div`
  width: 900px;
  position: absolute;
  bottom: -450px;
  z-index: 1;

  @media screen and (max-width: 768px) {
    width: 570px;
    bottom: -220px;
  }
`;

const MainBannerBottomImage = styled.img`
  width: 100%;
`;

const MainBannerTitle = styled.span`
  font-size: 60px;
  line-height: 60px;
  font-weight: 700;

  mix-blend-mode: difference;
  color: white;

  display: block;

  z-index: 2;
`;

const NewDevelop = () => {
  return (
    <MainBanner>
      <MainBannerBackground src={background} />
      <MainBannerTitle>WE ARE BRAVEGIRLS</MainBannerTitle>
      <MainBannerTitle>WE ARE FEARLESS</MainBannerTitle>
      <MainBannerBottomImageWrap>
        <MainBannerBottomImage src={weRideImage} />
      </MainBannerBottomImageWrap>
      <MainBannerTop />
      <MainBannerBottom />
    </MainBanner>
  );
};

export default NewDevelop;
