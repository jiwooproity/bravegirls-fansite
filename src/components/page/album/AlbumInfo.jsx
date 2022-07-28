import React from "react";
import styled, { keyframes } from "styled-components";

const AlbumWrapper = styled.div`
  width: 990px;

  padding: 50px 0px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.7fr;
    width: 100%;

    padding: 0px;
  }
`;

const AlbumLeftSide = styled.div`
  width: 620px;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumImageWrap = styled.div`
  width: 400px;

  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;

  @media screen and (max-width: 768px) {
    width: 100%;

    border-radius: 5px;
    overflow: hidden;
  }
`;

const AlbumImage = styled.img`
  width: 100%;
  display: block;
`;

const LpImageWrap = styled.div`
  width: 400px;

  position: absolute;
  top: 50%;
  left: 200px;

  transform: translateY(-50%);

  z-index: -1;

  @media screen and (max-width: 768px) {
    width: 100%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  transition: transform 0.5s ease;
`;

const rotateLP = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const LpImage = styled.img`
  width: 100%;
  display: block;

  animation: ${rotateLP} 2s linear infinite;
`;

const AlbumRightSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const AlbumDescription = styled.div`
  width: 370px;

  @media screen and (max-width: 768px) {
    width: 100%;

    padding: 15px 0px;
  }
`;

const AlbumTitleText = styled.h1`
  font-size: 30px;
  line-height: 30px;

  color: rgba(54, 54, 54);

  @media screen and (max-width: 768px) {
    font-size: 35px;
    line-height: 35px;
  }
`;

const DescriptionText = styled.p`
  font-size: 13px;
  line-height: 20px;

  padding: 0px 0px 10px 0px;
  color: rgba(54, 54, 54, 0.4);
`;

const AlbumEntertainment = styled.h1`
  font-size: 12px;
  line-height: 12px;

  padding: 10px 0px;

  color: rgba(54, 54, 54, 0.6);
`;

const AlbumInfo = (props) => {
  const { data } = props;

  // 앨범 이미지
  const { cover, lp } = data;

  // 앨범 INFO 데이터
  const { title, enter, description, descriptionSecond } = data;

  return (
    <AlbumWrapper>
      <AlbumLeftSide>
        <AlbumImageWrap>
          <AlbumImage src={cover} />
          <LpImageWrap>
            <LpImage src={lp} />
          </LpImageWrap>
        </AlbumImageWrap>
      </AlbumLeftSide>
      <AlbumRightSide>
        <AlbumDescription>
          <AlbumTitleText>{title}</AlbumTitleText>
          <AlbumEntertainment>{enter}</AlbumEntertainment>
          <DescriptionText>{description}</DescriptionText>
          <DescriptionText>{descriptionSecond}</DescriptionText>
        </AlbumDescription>
      </AlbumRightSide>
    </AlbumWrapper>
  );
};

export default AlbumInfo;
