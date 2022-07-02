import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled, { css, keyframes } from "styled-components";

import useAudio from "hooks/useAudio";

import { highheel, rollinFile, weRide, chimatbaram, chimatbaram_eng, afterWeRide, whistle } from "static/music";
import { Loading } from "components";

import { photocardService } from "service/photocardService";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const SectionTitleWrap = styled.div`
  width: 100%;
  padding: 0px 0px 50px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

const SectionTitle = styled.h1`
  font-size: 30px;
`;

const SectionSpan = styled.span`
  font-size: 30px;
  font-weight: 400;
`;

const SectionSubTitle = styled.p`
  font-size: 12px;
  font-weight: 100;
`;

const SectionBackground = styled.img`
  width: 100%;
  height: 100%;

  z-index: -2;

  position: absolute;
  top: 0;
  object-fit: cover;
`;

const SectionBackgroundBlur = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(100px);
  position: absolute;
  top: 0;
  z-index: -1;
`;

const SectionContent = styled.div`
  width: 990px;
  padding: 50px 0px 100px 0px;
`;

const MusicCustomWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 388px;
`;

const Album = styled.div`
  width: 55%;
  height: 350px;
  position: relative;
  display: block;
`;

const AlbumImage = styled.img`
  width: 350px;
  position: absolute;
  display: block;
  object-fit: contain;
  top: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const rotateLP = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const LpImage = styled.img`
  width: 345px;
  position: absolute;
  top: 5px;
  left: 175px;
  object-fit: contain;

  ${({ playing }) =>
    playing
      ? css`
          animation: ${rotateLP} 2s linear infinite;
        `
      : css``}

  transform-origin: 50% 50%;
  cursor: pointer;
`;

const Description = styled.div`
  width: 45%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 5px;
`;

const MainTitle = styled.div`
  display: flex;
`;

const MainColor = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 5px 5px 0px;
  box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
  background-color: ${({ musicColor }) => musicColor};
`;

const AlbumTitle = styled.h1`
  font-size: 20px;
  line-height: 20px;
`;

const AlbumSubTitle = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  margin: 5px 0px;
`;

const AlbumDescription = styled.span`
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.6);
`;

const AlbumMenu = styled.div`
  width: 990px;
  margin: 50px 0px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtomWrap = styled.div`
  display: flex;
  margin: 0px 5px 0px 5px;
  padding: 8px;
  background-color: ${({ mainColor }) => mainColor};

  &:hover {
    transform: translateY(-2px);
  }

  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: transform 0.5s ease;

  cursor: pointer;
`;

const MusicButton = styled.button`
  font-size: 14px;
  line-height: 14px;
  border: none;
  background-color: transparent;
  color: ${({ mainColor }) => (mainColor === "#ffffff" ? "rgba(0, 0, 0, 0.8)" : "white")};

  cursor: pointer;
`;

// 음악 파일 인덱스 별로 구분
const musicArr = [highheel, rollinFile, weRide, chimatbaram, chimatbaram_eng, afterWeRide, whistle];

const MusicSection = () => {
  const [access, setAccess] = useState(false);
  const [clonePlay, setClonePlay] = useState(false);

  const [albumList, setAlbumList] = useState([]);

  const [musicId, setMusicId] = useState(1);
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const [audio, playing, pause, load, toggle] = useAudio(musicArr[musicId]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (access) {
      if (playing) {
        toggle();
      }

      load();
    }
    // eslint-disable-next-line
  }, [musicId]);

  const loadData = async () => {
    setLoading(false);
    const response = await photocardService.getMusicList();
    const albumData = response.map((res) => ({
      title: res.music_title,
      color: res.music_color,
    }));

    setAlbumList(albumData);
    setMusicList(response);
    setLoading(true);
  };

  const onClickTitle = (index) => {
    setMusicId(index);
  };

  return (
    <Section>
      <SectionBackgroundBlur />
      {loading && <SectionBackground src={musicList[musicId].music_album_image} />}
      <SectionContent width={990}>
        <SectionTitleWrap>
          <SectionTitle>
            <SectionSpan>브레이브걸스</SectionSpan> 앨범
            <SectionSubTitle>브레이브걸스의 타이틀 곡 듣고 가세요!</SectionSubTitle>
          </SectionTitle>
        </SectionTitleWrap>
        {loading ? (
          <>
            <MusicCustomWrap>
              <Album>
                {access ? (
                  <LpImage playing={playing} src={musicList[musicId].music_lp_image} onClick={pause} />
                ) : (
                  // Access 코드를 받을 경우
                  <LpImage
                    playing={clonePlay}
                    src={musicList[musicId].music_lp_image}
                    onClick={() => {
                      if (clonePlay) {
                        setClonePlay(false);
                      } else {
                        const question = window.prompt("음원을 듣기 위해서는 Access 코드를 입력해주세요.\n확인이 필요한 부분이 있어 잠시 비활성화 합니다.");

                        if (question === "3380") {
                          setAccess(true);
                        }

                        setClonePlay(true);
                      }
                    }}
                  />
                )}

                <a href={musicList[musicId].music_video} target={"_blank"} rel={"noreferrer"}>
                  <AlbumImage src={musicList[musicId].music_album_image} />
                </a>
              </Album>

              <Description>
                <MainTitle>
                  <MainColor musicColor={musicList[musicId].music_color} />
                  <AlbumTitle>{musicList[musicId].music_title}</AlbumTitle>
                </MainTitle>
                <AlbumSubTitle>장르 : {musicList[musicId].music_genre}</AlbumSubTitle>
                <AlbumSubTitle>발매일 : {musicList[musicId].music_release}</AlbumSubTitle>
                <AlbumSubTitle>작사 : {musicList[musicId].music_lyricist}</AlbumSubTitle>
                <AlbumSubTitle>작곡 : {musicList[musicId].music_composition}</AlbumSubTitle>
                <AlbumSubTitle>편곡 : {musicList[musicId].music_arrangement}</AlbumSubTitle>

                <AlbumSubTitle>
                  기획 :{" "}
                  <a href="http://www.bravesound.com/" target={"_blank"} rel="noreferrer">
                    {musicList[musicId].music_plan}
                  </a>
                </AlbumSubTitle>

                <AlbumDescription>{musicList[musicId].music_description}</AlbumDescription>
                <AlbumDescription>{musicList[musicId].music_description_second && musicList[musicId].music_description_second}</AlbumDescription>
              </Description>
            </MusicCustomWrap>
            <AlbumMenu>
              {_.map(albumList, (music, index) => (
                <ButtomWrap key={index} mainColor={music.color}>
                  <MusicButton mainColor={music.color} onClick={() => onClickTitle(index)}>
                    {music.title}
                  </MusicButton>
                </ButtomWrap>
              ))}
            </AlbumMenu>
          </>
        ) : (
          <Loading />
        )}
      </SectionContent>
    </Section>
  );
};

export default MusicSection;
