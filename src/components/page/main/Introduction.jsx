import React from "react";
import styled from "styled-components";

const SecondSection = styled.div`
  width: 100%;

  padding: 50px 15px 30px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BarHeight = styled.div`
  width: 1px;
  height: 160px;

  margin: 30px 0px 0px 0px;

  background-color: ${(props) => props.theme.barBgColor};

  position: relative;

  &::before {
    content: "";
    width: 5px;
    height: 5px;

    border-radius: 2.5px;

    position: absolute;
    top: 0;
    left: -2px;

    background-color: ${(props) => props.theme.barCircleColor};

    animation: "moveY" 3s ease infinite;
  }

  @keyframes moveY {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(160px);
    }
  }
`;

const LogoDescription = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.lightDesTextColor};

  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.3rem;
  }
`;

const DescriptionActive = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.desTextColor};

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.3rem;
  }
`;

const NewSecond = () => {
  return (
    <SecondSection>
      <LogoDescription>
        <DescriptionActive>브레이브걸스</DescriptionActive>는 브레이브엔터테인먼트 소속으로, 2016년 데뷔한 2기 멤버{" "}
        <DescriptionActive>민영, 유정, 은지, 유나</DescriptionActive>로 구성된 4인조 걸그룹이다.
      </LogoDescription>
      <LogoDescription>
        5년여간 무명의 걸그룹이었지만, <DescriptionActive>유튜브</DescriptionActive>에서 시작된 <DescriptionActive>롤린의 역주행</DescriptionActive>으로 많은
        주목을 받으면서 방송 출연 빈도가 크게 늘어나는 등 <DescriptionActive>대세 걸그룹</DescriptionActive>으로 발돋움했다.
      </LogoDescription>
      <BarHeight />
    </SecondSection>
  );
};

export default NewSecond;
