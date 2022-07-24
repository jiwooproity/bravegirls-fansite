import React from "react";
import styled from "styled-components";
import MusicSection from "../useSection/MusicSection";

const AlbumContainer = styled.div`
  width: 100%;
`;

const AlbumNavbar = styled.div`
  width: 100%;
  height: 84px;
  /* background-color: rgba(0, 0, 0, 1);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
`;

const Section = styled.div`
  min-height: calc(100vh - 284px);

  @media screen and (max-width: 768px) {
    padding: 20px 0px 0px 0px;
  }
`;

const Album = () => {
  return (
    <AlbumContainer>
      <AlbumNavbar />
      <Section>
        <MusicSection />
      </Section>
    </AlbumContainer>
  );
};

export default Album;
