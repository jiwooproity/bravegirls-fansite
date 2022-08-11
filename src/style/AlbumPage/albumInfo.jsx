import styled, { keyframes } from "styled-components";

const AlbumInfo = {};

AlbumInfo.Wrapper = styled.div`
  width: 990px;
  padding: 50px 0px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px;

    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

AlbumInfo.LeftSide = styled.div`
  width: 620px;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

AlbumInfo.ImageWrapper = styled.div`
  width: 400px;

  position: relative;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
  z-index: 2;

  @media screen and (max-width: 768px) {
    width: 100%;

    border-radius: 5px;
    overflow: hidden;
  }
`;

AlbumInfo.CoverImage = styled.img`
  width: 100%;

  display: block;
  position: relative;

  z-index: 2;

  @media screen and (max-width: 768px) {
    border-radius: 5px;
  }
`;

AlbumInfo.LpImageWrapper = styled.div`
  width: 400px;

  position: absolute;
  top: 50%;
  left: 200px;

  transform: translateY(-50%);
  z-index: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  transition: transform 0.5s ease;
`;

// LP 이미지 회전
const rotateLP = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

AlbumInfo.LpImage = styled.img`
  width: 100%;

  display: block;

  animation: ${rotateLP} 3.5s linear infinite;
`;

AlbumInfo.RightSide = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  position: relative;

  z-index: 1;
`;

AlbumInfo.InfoWrapper = styled.div`
  width: 370px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 15px 0px;
  }
`;

AlbumInfo.Title = styled.h1`
  font-size: 30px;
  line-height: 30px;

  color: ${({ theme }) => theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 35px;
    line-height: 35px;
  }
`;

AlbumInfo.Description = styled.p`
  font-size: 13px;
  line-height: 20px;

  padding: 0px 0px 10px 0px;

  color: ${({ theme }) => theme.desTextColor};
`;

AlbumInfo.PlanInfo = styled.h1`
  font-size: 12px;
  line-height: 12px;

  padding: 10px 0px;

  color: ${({ theme }) => theme.subTitleTexatColor};
`;

export { AlbumInfo };
