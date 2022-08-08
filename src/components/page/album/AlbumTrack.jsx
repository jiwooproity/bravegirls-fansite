import React from "react";
import { Fade } from "react-reveal";

import _ from "lodash";

import {
  TrackArtist,
  TrackContainer,
  TrackItemsWrap,
  TrackList,
  TrackListBox,
  TrackListTitle,
  TrackListWrapper,
  TrackNumber,
  TrackSubTitle,
  TrackTitle,
  TrackTitleWrap,
} from "style";

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
                        {!_.isUndefined(track.subTitle) && (
                          <TrackSubTitle>{track.subTitle}</TrackSubTitle>
                        )}
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
