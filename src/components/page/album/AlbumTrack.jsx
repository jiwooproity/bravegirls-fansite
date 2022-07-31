import React from "react";
import styled from "styled-components";

import _ from "lodash";
import { Fade } from "react-reveal";

const TrackContainer = styled.div`
  width: 100%;
  margin: 0px 0px 0px 0px;
  padding: 30px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

// const TrackBackground = styled.div`
//   width: 100%;
//   height: calc(100% - 80px);

//   position: absolute;
//   bottom: 0;
//   left: 0;

//   background-color: ${({ color }) => color};
// `;

const TrackListWrapper = styled.div`
  width: 100%;
  padding: 0px 15px 0px 15px;

  display: flex;
  flex-direction: column;
`;

const TrackList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 3fr;

  padding: 15px 0px;

  border-top: 1px solid ${(props) => props.theme.trackListBorder};

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  transition: border-top 0.5s ease;
`;

const TrackItemsWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:nth-child(1) {
    padding: 0px 15px 0px 0px;
  }

  &:nth-child(2) {
    padding: 0px 0px 0px 15px;
    border-left: 1px solid ${(props) => props.theme.trackListBorder};
  }

  transition: border-left 0.5s ease;
`;

const TrackTitleWrap = styled.div`
  width: 100%;
  display: flex;
`;

const TrackListBox = styled.div`
  width: 990px;
  min-height: 500px;

  /* border-radius: 15px 15px 0px 0px; */

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundColor};

  z-index: 1;
  /* 
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; */

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const TrackListTitle = styled.h1`
  font-size: 40px;
  line-height: 40px;

  color: ${(props) => props.theme.titleTextColor};

  padding: 20px 0px 30px 0px;

  @media screen and (max-width: 768px) {
    font-size: 25px;
    line-height: 25px;
  }
`;

const TrackNumber = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;

  color: ${(props) => props.theme.titleTextColor};

  padding: 0px 10px 0px 0px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
`;

const TrackTitle = styled.h1`
  font-size: 20px;
  line-height: 20px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 15px;
    line-height: 15px;
  }
`;

const TrackSubTitle = styled.span`
  font-size: 20px;
  line-height: 20px;

  color: ${(props) => props.theme.desTextColor};

  @media screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 18px;
  }
`;

const TrackArtist = styled.p`
  font-size: 12px;
  line-height: 12px;

  padding: 0px 0px 5px 0px;

  color: ${(props) => props.theme.desTextColor};

  @media screen and (max-width: 768px) {
    font-size: 10px;
    line-height: 10px;
  }
`;

const AlbumTrack = (props) => {
  const { data } = props;

  return (
    <TrackContainer>
      <TrackListBox>
        <TrackListTitle>TRACK LIST</TrackListTitle>
        <TrackListWrapper>
          {!_.isEmpty(data)
            ? _.map(data, (track, index) => (
                <Fade bottom key={index}>
                  <TrackList>
                    <TrackItemsWrap>
                      <TrackTitleWrap>
                        <TrackNumber>{`${track.id}.`}</TrackNumber>
                        <TrackTitle>{track.title}</TrackTitle>
                        {!_.isUndefined(track.subTitle) && <TrackSubTitle>{track.subTitle}</TrackSubTitle>}
                      </TrackTitleWrap>
                    </TrackItemsWrap>
                    <TrackItemsWrap>
                      <TrackArtist>{"Lyricist"}</TrackArtist>
                      <TrackArtist>{"Composition"}</TrackArtist>
                      <TrackArtist>{"Arrangement"}</TrackArtist>
                    </TrackItemsWrap>
                    <TrackItemsWrap>
                      <TrackArtist>{track.lyricist}</TrackArtist>
                      <TrackArtist>{track.composition}</TrackArtist>
                      <TrackArtist>{track.arrangement}</TrackArtist>
                    </TrackItemsWrap>
                  </TrackList>
                </Fade>
              ))
            : null}
        </TrackListWrapper>
      </TrackListBox>
    </TrackContainer>
  );
};

export default AlbumTrack;
