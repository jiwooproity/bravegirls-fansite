import React from "react";
import styled from "styled-components";

import mama2 from "static/img/mama2.jpg";

const Container = styled.div`
  width: 100%;
  height: 600px;

  @media screen and (max-width: 1650px) {
    height: 45vh;
  }

  @media screen and (max-width: 1280px) {
    height: 40vh;
  }

  @media screen and (max-width: 990px) {
    height: 35vh;
  }

  @media screen and (max-width: 768px) {
    height: 200px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const WrapperBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const WrapperBlur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }

  transition: background-color 0.5s ease;
`;

const TestSection = () => {
  return (
    <Container>
      <Wrapper>
        <WrapperBackground src={mama2} />
        <WrapperBlur />
      </Wrapper>
    </Container>
  );
};

export default TestSection;
