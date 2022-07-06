import React, { useState } from "react";

import styled, { keyframes } from "styled-components";

import banner from "static/img/specialBanner.jpg";

const BannerContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;

  text-align: center;

  transform: translate(-50%, -50%);
`;

const typingAnimation = keyframes`
    to {
        opacity: 0;
    }
`;

const BannerTitle = styled.span`
  font-size: 43px;
  font-weight: 400;

  display: block;

  color: rgba(255, 255, 255, 0.5);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 6px;
    width: 5px;
    margin-left: 2px;
    height: 55px;

    background-color: rgba(255, 255, 255, 0.5);

    animation: ${typingAnimation} 1s infinite;

    @media screen and (max-width: 768px) {
      height: 44px;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 35px;
  }
`;

const BannerSubTitle = styled.span`
  font-size: 15px;
  font-weight: 100;

  display: block;

  color: rgba(255, 255, 255, 0.5);
`;

const MainBanner = () => {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("1");

  const clear = () => {
    clearTimeout();
  };

  setTimeout(() => {
    let nowTxt = text;
    const txt = "854일의 기적";
    const char = txt.split("");

    if (number < txt.length) {
      let index = number;
      nowTxt = nowTxt += char[index];
      setNumber(index + 1);
      setText(nowTxt);
    } else {
      clear();
    }
  }, 500);

  return (
    <BannerContainer>
      <BannerImageWrapper>
        <BannerImage src={banner} />
        <BannerBlur />
        <BannerTitleWrapper>
          <BannerTitle>{text}</BannerTitle>
          <BannerSubTitle>B'Girls Are Back! "안녕하세요, 브레이브걸스입니다!"</BannerSubTitle>
        </BannerTitleWrapper>
      </BannerImageWrapper>
    </BannerContainer>
  );
};

export default MainBanner;
