import React from "react";
import styled from "styled-components";
import CardSection from "../useSection/CardSection";

const PhotoCardContainer = styled.div`
  width: 100%;
`;

const PhotoCardNavbar = styled.div`
  width: 100%;
  height: 84px;
  background-color: rgba(0, 0, 0, 1);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const Section = styled.div`
  min-height: calc(100vh - 284px);
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 20px 0px 0px 0px;
  }
`;

const PhotoCardPage = () => {
  return (
    <PhotoCardContainer>
      <PhotoCardNavbar />
      <Section>
        <CardSection />
      </Section>
    </PhotoCardContainer>
  );
};

export default PhotoCardPage;
