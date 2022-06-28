import React from "react";
import styled from "styled-components";

import banner from "static/img/banner.png";
import banner_02 from "static/img/banner_02.png";
import background from "static/img/background.jpg";
import Section from "./Section";
import CardSection from "./CardSection";
import MusicSection from "./MusicSection";
import NewSection from "./QueenSection";

const MainWrapper = styled.div`
  width: 100%;
  padding: 0px 30px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const BannerContainer = styled.div`
  width: 990px;
  position: relative;
`;

const BannerBackground = styled.div`
  width: 100%;
  height: 90%;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const BannerBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerBlur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6);
`;

const BannerWrapper = styled.div`
  width: 990px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: rgba(0, 0, 0, 0.9); */
`;

const BannerTitleWrap = styled.div``;

const BannerTitle = styled.h1`
  font-size: 55px;
  line-height: 45px;
  display: block;
  color: white;
`;

const DescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px 0px 0px;
`;

const BannerDescription = styled.span`
  font-size: 13px;
  line-height: 13px;
  padding: 5px 0px;
  color: rgba(120, 120, 120);
`;

const BannerImageContainer = styled.div`
  width: 400px;
  height: 500px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  border-radius: 10px;
  overflow: hidden;
  background-color: gray;

  &:hover {
    bottom: 20px;
  }

  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  transition: bottom 0.5s ease;
`;

const BannerImageWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerHover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.5s ease;
`;

const BannerHoverText = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const TitleLiner = styled.div`
  height: 1px;
  background-color: rgba(30, 30, 30, 0.8);
`;

const Main = () => {
  const randomIndex = Math.floor(Math.random() * 2);
  const bannerArr = [banner, banner_02];

  return (
    <>
      <MainWrapper>
        {/* ------------------------- 배경 ------------------------- */}
        <BannerBackground>
          <BannerBackgroundImage src={background} />
          <BannerBlur />
        </BannerBackground>
        {/* ------------------------- 배경 ------------------------- */}

        {/* ------------------------- 배너 ------------------------- */}
        <BannerContainer>
          <BannerWrapper>
            <BannerTitleWrap>
              <BannerTitle>PhotoCard Gallery</BannerTitle>
            </BannerTitleWrap>
            <DescriptionWrap>
              <BannerDescription>원하는 포토카드 디자인을 다운로드 하자!</BannerDescription>
            </DescriptionWrap>
            <TitleLiner />
            {/* <MusicSection /> */}
          </BannerWrapper>
          <BannerImageContainer>
            <BannerImageWrap>
              <BannerImage src={bannerArr[randomIndex]} />

              <a href={bannerArr[randomIndex]}>
                <BannerHover>
                  <BannerHoverText>보러가기</BannerHoverText>
                </BannerHover>
              </a>
            </BannerImageWrap>
          </BannerImageContainer>
        </BannerContainer>
        {/* ------------------------- 배너 ------------------------- */}
      </MainWrapper>

      {/* ------------------------- 첫번째 섹션 ------------------------- */}
      <Section />
      {/* ------------------------- 첫번째 섹션 ------------------------- */}

      {/* ------------------------- 두번째 섹션 ------------------------- */}
      <CardSection />
      {/* ------------------------- 두번째 섹션 ------------------------- */}

      {/* ------------------------- 세번째 섹션 ------------------------- */}
      {<MusicSection />}
      {/* ------------------------- 세번째 섹션 ------------------------- */}

      {/* ------------------------- 세번째 섹션 ------------------------- */}
      {<NewSection />}
      {/* ------------------------- 세번째 섹션 ------------------------- */}
    </>
  );
};

export default Main;
