import React from "react";
import styled from "styled-components";

import bravegirls from "static/img/bravegirls_first.jpg";

const LogoContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 990px;
  padding: 50px 0px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */

  background-color: white;
`;

const LogoText = styled.h1`
  margin-bottom: 20px;
  font-size: 165px;
  line-height: 165px;
  background-image: url(${bravegirls});
  background-size: 1050px;
  background-repeat: no-repeat;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;

const LogoDescription = styled.span`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.4);
`;

const DescriptionActive = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
`;

const LogoSection = () => {
  return (
    <LogoContainer>
      <LogoWrapper>
        <LogoText>BRAVEGIRLS</LogoText>
        <LogoDescription>
          <DescriptionActive>브레이브걸스</DescriptionActive>는 브레이브엔터테인먼트 소속으로, 2016년 데뷔한 2기 멤버{" "}
          <DescriptionActive>민영, 유정, 은지, 유나</DescriptionActive>로 구성된 4인조 걸그룹이다.
        </LogoDescription>
        <LogoDescription>
          5년여간 무명의 걸그룹이었지만, <DescriptionActive>유튜브</DescriptionActive>에서 시작된 <DescriptionActive>롤린의 역주행</DescriptionActive>으로 많은
          주목을 받으면서 방송 출연 빈도가 크게 늘어나는 등 <DescriptionActive>대세 걸그룹</DescriptionActive>으로 발돋움했다.
        </LogoDescription>
      </LogoWrapper>
    </LogoContainer>
  );
};

export default LogoSection;
