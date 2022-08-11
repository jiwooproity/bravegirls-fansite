import styled from "styled-components";

const CanvasDetail = {};

CanvasDetail.Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 15px 0px 15px;

  display: flex;
  justify-content: center;
`;

CanvasDetail.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px 50px 0px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

CanvasDetail.CanvasContainer = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

CanvasDetail.CanvasWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  &:hover {
    div:nth-child(2) {
      height: 150px;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

CanvasDetail.CanvasImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

CanvasDetail.InfoBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 10px;
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: height 0.5s ease, background-color 0.5s ease, backdrop-filter 0.5s;
`;

CanvasDetail.InfoTitle = styled.span`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;

  color: rgba(255, 255, 255, 0.9);
`;

CanvasDetail.InfoDescription = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;

  padding: 20px 0px;

  color: rgba(255, 255, 255, 0.9);
`;

CanvasDetail.InnerInfo = styled.div`
  padding: 30px 0px 0px 0px;
`;

CanvasDetail.InnerTitle = styled.h1`
  font-size: 30px;
  line-height: 30px;

  padding: 0px 0px 5px 0px;

  color: ${({ theme }) => theme.titleTextColor};
`;

export { CanvasDetail };
