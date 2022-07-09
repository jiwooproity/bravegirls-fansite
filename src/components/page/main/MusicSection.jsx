import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import styled, { css, keyframes } from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import useAudio from "hooks/useAudio";

import { highheel, rollinFile, weRide, chimatbaram, chimatbaram_eng, afterWeRide, whistle, red_sun } from "static/music";
import { Loading, SectionComponent } from "components";

import { photocardService } from "service/photocardService";

const Section = styled.div`
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const MusicCustomWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 388px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Album = styled.div`
  width: 55%;
  height: 350px;
  position: relative;
  display: block;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumImage = styled.img`
  width: 350px;
  position: absolute;
  display: block;
  object-fit: contain;
  top: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  @media screen and (max-width: 768px) {
    width: 320px;
    left: 50%;
    transform: translateX(-50%);
  }

  transition: left 0.5s ease, width 0.5s ease, transform 0.5s ease;
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

  @media screen and (max-width: 768px) {
    width: 300px;
    left: 50%;
    transform: translateX(-50%);
  }

  transition: left 0.5s ease, width 0.5s ease, transform 0.5s ease;
`;

const Description = styled.div`
  width: 45%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.7);
  /* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    display: none;
  }
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

  transition: background-color 0.5s ease;
`;

const AlbumTitle = styled.h1`
  font-size: 20px;
  line-height: 20px;
`;

const AlbumSubTitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  margin: 5px 0px;
`;

const AlbumDescription = styled.span`
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.6);
`;

const AlbumMenuOpener = styled.button`
  width: 100%;
  padding: 8px 0px;
  background-color: rgba(255, 255, 255, 0.6);
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: black;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 1);
    color: white;

    svg {
      color: white;
    }
  }

  transition: background-color 0.5s ease, color 0.5s ease;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const AlbumMenuButtonText = styled.span`
  font-size: 12px;
`;

const AlbumMenuButtonArrow = styled(FontAwesomeIcon)`
  font-size: 12px;
  line-height: 12px;
  margin-top: ${({ open }) => (open ? "2px" : "0px")};
  margin-left: 5px;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
  color: white;
  transition: transform 0.5s ease, margin-top 0.5s ease, color 0.5s ease;
`;

const AlbumMenu = styled.div`
  width: 990px;
  height: ${({ open, musicLength }) => (open ? `${musicLength * 51.09}px` : "0px")};
  overflow: hidden;
  margin: 0px 0px 0px 0px;
  justify-content: center;
  align-items: center;
  position: relative;

  transition: height 0.5s ease;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: ${({ musicLength }) => `${musicLength * 51.09}px`};
  }
`;

const ButtomWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  padding: 5px;
  background-color: white;

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  cursor: pointer;
`;

const MusicButton = styled.button`
  width: 100%;
  margin-left: 8px;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  border: none;
  background-color: transparent;
  /* color: ${({ mainColor }) => (mainColor === "#ffffff" ? "rgba(0, 0, 0, 0.8)" : "white")}; */

  cursor: pointer;
`;

const MusicButtonText = styled.span`
  width: 100%;
  margin-top: 5px;
  font-size: 12px;
`;

const MusicButtonImage = styled.img`
  width: 40px;
  border-radius: 3px;
`;

const FontAwesomeCustom = styled(FontAwesomeIcon)`
  display: block;
  color: black;
  margin-right: 8px;
`;

// 음악 파일 인덱스 별로 구분
const musicArr = [highheel, rollinFile, weRide, chimatbaram, chimatbaram_eng, afterWeRide, whistle, red_sun];

const MusicSection = () => {
  const [access, setAccess] = useState(false);
  const [clonePlay, setClonePlay] = useState(false);
  const [openList, setOpenList] = useState(false);

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
    }

    load();
    // eslint-disable-next-line
  }, [musicId]);

  const loadData = useCallback(async () => {
    setLoading(false);
    const response = await photocardService.getMusicList();
    const albumData = response.map((res) => ({
      musicId: res.music_idx,
      title: res.music_title,
      color: res.music_color,
      cover: res.music_album_image,
    }));

    setAlbumList(albumData);
    setMusicList(response);
    setLoading(true);

    // eslint-disable-next-line
  }, [albumList, musicList]);

  const onClickTitle = (index) => {
    setMusicId(index);
  };

  const onOpen = () => {
    setOpenList(!openList);
  };

  const onHandleChange = (result) => {
    if (!result.destination) return;
    const items = [...albumList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAlbumList(items);
  };

  return (
    <Section>
      {/* <SectionBackgroundBlur /> */}
      {/* {loading && <SectionBackground src={musicList[musicId].music_album_image} />} */}
      <SectionComponent
        width={990}
        padding={"50px 0px 50px 0px"}
        // color={"white"}
        title={"브레이브걸스"}
        active={"앨범"}
        subTitle={"브레이브걸스의 타이틀 곡 듣고 가세요!"}
      >
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
            <AlbumMenuOpener mainColor={musicList[musicId].music_color} onClick={onOpen}>
              <AlbumMenuButtonText>플레이리스트 더보기</AlbumMenuButtonText>
              <AlbumMenuButtonArrow open={openList} icon={faCaretDown} />
            </AlbumMenuOpener>
            <DragDropContext onDragEnd={onHandleChange}>
              <Droppable droppableId="musicList">
                {(provided) => (
                  <AlbumMenu {...provided.droppableProps} ref={provided.innerRef} className="musicList" open={openList} musicLength={musicList.length}>
                    {_.map(albumList, (music, index) => (
                      <Draggable key={String(index)} index={index} draggableId={String(index)}>
                        {(provided) => (
                          <ButtomWrap ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} key={index} mainColor={music.color}>
                            <MusicButtonImage src={music.cover} />
                            <MusicButton mainColor={music.color} onClick={() => onClickTitle(music.musicId - 1)}>
                              {music.title}
                              <MusicButtonText>브레이브걸스</MusicButtonText>
                            </MusicButton>
                            <FontAwesomeCustom icon={faBars} />
                          </ButtomWrap>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </AlbumMenu>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <Loading />
        )}
      </SectionComponent>
    </Section>
  );
};

export default MusicSection;
