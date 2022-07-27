import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import leftBanner from "../../../static/img/winner/left.png";
import rightBanner from "../../../static/img/winner/right.png";

const HistoryBannerContainer = styled.div`
  width: 100%;
  height: 500px;

  display: flex;

  @media screen and (max-width: 1650px) {
    height: 40vh;
  }

  @media screen and (max-width: 1280px) {
    height: 35vh;
  }

  @media screen and (max-width: 990px) {
    height: 30vh;
  }

  @media screen and (max-width: 768px) {
    height: 150px;
  }
`;

const HistoryBannerWrapper = styled.div`
  width: 1920px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  overflow: hidden;
`;

const HistoryBannerImageLeft = styled.div`
  width: 100%;
  height: 100%;

  background-color: black;
  position: absolute;
  left: 0;
`;

const HistoryBannerImageRight = styled.div`
  width: ${({ set }) => `calc(${set}% - 1px)`};
  height: 100%;
  background-color: gray;
  position: absolute;
  left: 0px;
  overflow: hidden;
  z-index: 1;

  transition: all 0.1s;

  border-right: 1px solid white;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HistoryImage = styled.img`
  width: 100vw;
  height: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
`;

const HistoryBannerBlur = styled.div`
  width: 100vw;
  height: 100%;

  position: absolute;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
`;

const HistoryText = styled.h1`
  font-size: 30px;
  line-height: 30px;
  font-weight: 700px;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);

  @media screen and (max-width: 768px) {
    font-size: 15px;
    line-height: 15px;

    display: none;
  }
`;

const HistoryBanner = () => {
  const dragRef = useRef(null);

  const [width, setWidth] = useState(100);

  const moveWidth = useCallback(
    (e) => {
      let x = width;

      const { movementX } = e;

      if (x >= 0 && x <= 100) {
        if (movementX > 0) {
          x = x + 1;
        } else if (movementX < 0) {
          x = x - 1;
        }

        setWidth(x);
      }
    },
    [width]
  );

  useEffect(() => {
    if (dragRef.current) {
      dragRef.current.addEventListener("mousemove", moveWidth);
    }
  }, [dragRef, width, setWidth, moveWidth]);

  return (
    <HistoryBannerContainer ref={dragRef}>
      <HistoryBannerWrapper>
        <HistoryBannerImageLeft>
          <HistoryImage src={leftBanner} />
          <HistoryBannerBlur>
            <HistoryText>저에게 왔듯, 여러분들께도 오고 있을 그 모든 것들을</HistoryText>
          </HistoryBannerBlur>
        </HistoryBannerImageLeft>
        <HistoryBannerImageRight set={width}>
          <HistoryImage src={rightBanner} />
          <HistoryBannerBlur>
            <HistoryText>포기하지 말아요</HistoryText>
          </HistoryBannerBlur>
        </HistoryBannerImageRight>
      </HistoryBannerWrapper>
    </HistoryBannerContainer>
  );
};

export default HistoryBanner;
