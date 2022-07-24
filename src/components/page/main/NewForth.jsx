import React from "react";
import styled from "styled-components";

import background from "static/img/background.jpg";

const ForthSection = styled.div`
  width: 100%;
  height: 400px;
  padding: 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  background-color: #f5f7f8;
`;

const ForthBackgroundImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;

  filter: grayscale(80%);
`;

const ForthBackground = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);
`;

const ForthContainer = styled.div`
  width: 990px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  z-index: 1;

  position: relative;
`;

const ForthSectionTitle = styled.h1`
  font-size: 25px;
  line-height: 32px;

  position: relative;

  mix-blend-mode: difference;
  color: rgba(255, 255, 255, 0.9);

  &::before {
    content: "";
    width: 100%;
    height: 7px;

    position: absolute;
    top: 65%;
    background-color: #914854;

    transform: skew(-60deg);

    z-index: -1;

    @media screen and (max-width: 768px) {
      height: 5px;
      top: 60%;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const NewForth = () => {
  return (
    <ForthSection>
      <ForthBackgroundImage src={background} />
      <ForthBackground />
      <ForthContainer>
        <ForthSectionTitle>I WILL ALWAYS GET UP</ForthSectionTitle>
        <ForthSectionTitle>ALWAYS YOUR HEART REACHES ME</ForthSectionTitle>
      </ForthContainer>
    </ForthSection>
  );
};

export default NewForth;
