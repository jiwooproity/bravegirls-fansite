import React from "react";
import { Fade } from "react-reveal";

import _ from "lodash";

import { AlbumTrack as CSS } from "style";

const AlbumTrack = (props) => {
  const { data } = props;

  return (
    <CSS.Container>
      <CSS.Wrapper>
        <CSS.MainTitle>TRACK LIST</CSS.MainTitle>
        <CSS.Box>
          {!_.isEmpty(data)
            ? _.map(data, (track, index) => (
                <Fade bottom key={index}>
                  <CSS.List>
                    <CSS.Items>
                      <CSS.TitleWrapper>
                        <CSS.Number>{`${track.id}.`}</CSS.Number>
                        <CSS.Title>{track.title}</CSS.Title>
                        {!_.isUndefined(track.subTitle) && <CSS.SubTitle>{track.subTitle}</CSS.SubTitle>}
                      </CSS.TitleWrapper>
                    </CSS.Items>
                    <CSS.Items>
                      <CSS.Artists>Lyricistss</CSS.Artists>
                      <CSS.Artists>Composition</CSS.Artists>
                      <CSS.Artists>Arrangement</CSS.Artists>
                    </CSS.Items>
                    <CSS.Items>
                      <CSS.Artists>{track.lyricist}</CSS.Artists>
                      <CSS.Artists>{track.composition}</CSS.Artists>
                      <CSS.Artists>{track.arrangement}</CSS.Artists>
                    </CSS.Items>
                  </CSS.List>
                </Fade>
              ))
            : null}
        </CSS.Box>
      </CSS.Wrapper>
    </CSS.Container>
  );
};

export default AlbumTrack;
