import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled, { css, keyframes } from "styled-components";

import useAudio from "hooks/useAudio";

import { rollinFile, weRide, chimatbaram, chimatbaram_eng } from "static/music";
import { SectionTitle, Loading } from "components";

import { photocardService } from "service/photocardService";

const MusicSectionContainer = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MusicSectionGubun = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: rgba(194, 177, 185);
  color: white;
  cursor: pointer;
`;

const MusicWrapper = styled.div`
  width: 990px;
  margin-top: 10px;
  display: flex;
`;

const MusicImage = styled.div`
  width: 60%;
  padding: 10px;
  position: relative;
  display: block;
`;

const MusicSectionAlbum = styled.img`
  width: 350px;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
`;

const rotateLP = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const MusicSectionLP = styled.img`
  width: 345px;
  position: absolute;
  top: 5px;
  left: 175px;

  ${({ playing }) =>
    playing
      ? css`
          animation: ${rotateLP} 2s linear infinite;
        `
      : css``}

  transform-origin: 50% 50%;
  cursor: pointer;
`;

const MusicDescriptionWrap = styled.div`
  width: 40%;
  margin-bottom: 50px;
  height: 350px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MusicTitleWrap = styled.div`
  display: flex;
`;

const MusicColor = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 5px 5px 0px;
  background-color: ${({ musicColor }) => musicColor};
`;

const MusicDesTitle = styled.h1`
  font-size: 20px;
  line-height: 20px;
`;

const MusicSubTitle = styled.span`
  font-size: 13px;
  line-height: 13px;
  margin: 3px 0px;
`;

const MusiceDescription = styled.span`
  font-size: 13px;
  line-height: 18px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.6);
`;

const MusicSection = () => {
  const gubunArr = ["Rollin`", "We Ride", "Chi Mat Ba Ram", "Chi Mat Ba Ram (eng)"];
  const musicArr = [rollinFile, weRide, chimatbaram, chimatbaram_eng];

  const [musicId, setMusicId] = useState(0);
  const [musicList, setMusicList] = useState({});
  const [loading, setLoading] = useState(false);

  const [playing, pause, toggle] = useAudio(musicArr[musicId]);

  useEffect(() => {
    setTimeout(() => {
      toggle();
    }, 2000);

    loadData(gubunArr[musicId]);
    // eslint-disable-next-line
  }, [musicId]);

  const loadData = async (title) => {
    setLoading(false);
    const response = await photocardService.getMusicList({ title });
    setMusicList(response);
    setLoading(true);
  };

  const onClickTitle = (title, id) => {
    if (!loading) {
      return;
    }

    if (playing) {
      toggle();
    }

    setMusicId(id);
    loadData(title);
  };

  return (
    <MusicSectionContainer>
      <SectionTitle title="Music" subTitle={`듣고 싶은 노래가 있으신가요?`}>
        {_.map(gubunArr, (gubun, index) => (
          <MusicSectionGubun key={index} onClick={() => onClickTitle(gubun, index)}>
            {gubun}
          </MusicSectionGubun>
        ))}
      </SectionTitle>

      <MusicWrapper>
        {loading ? (
          <>
            <MusicImage>
              <MusicSectionLP playing={playing} src={musicList.music_lp_image} onClick={pause} />
              <MusicSectionAlbum src={musicList.music_album_image} />
            </MusicImage>

            <MusicDescriptionWrap>
              <MusicTitleWrap>
                <MusicColor musicColor={musicList.music_color} />
                <MusicDesTitle>{musicList.music_title}</MusicDesTitle>
              </MusicTitleWrap>
              <MusicSubTitle>장르 : {musicList.music_genre}</MusicSubTitle>
              <MusicSubTitle>발매일 : {musicList.music_release}</MusicSubTitle>
              <MusiceDescription>{musicList.music_description}</MusiceDescription>
              <MusiceDescription>{musicList.music_description_second && musicList.music_description_second}</MusiceDescription>
            </MusicDescriptionWrap>
          </>
        ) : (
          <Loading />
        )}
      </MusicWrapper>
    </MusicSectionContainer>
  );
};

export default MusicSection;
