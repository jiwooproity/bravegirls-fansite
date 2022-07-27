import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";
import { useEffect } from "react";
import { configService } from "service/configService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = styled.div`
  width: 100%;
  height: 85px;
`;

const AlbumContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 100px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0px 15px;
  }
`;

const AlbumWrapper = styled.div`
  width: 990px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const AlbumLeftSide = styled.div`
  width: 620px;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumImageWrap = styled.div`
  width: 400px;

  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumImage = styled.img`
  width: 100%;
  display: block;
`;

const LpImageWrap = styled.div`
  width: 400px;

  position: absolute;
  top: 50%;
  left: 200px;

  transform: translateY(-50%);

  z-index: -1;

  @media screen and (max-width: 768px) {
    width: 100%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  transition: transform 0.5s ease;
`;

const LpImage = styled.img`
  width: 100%;
  display: block;
`;

const AlbumRightSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const AlbumDescription = styled.div`
  width: 370px;

  @media screen and (max-width: 768px) {
    width: 100%;

    padding: 15px 0px;
  }
`;

const AlbumTitleText = styled.h1`
  font-size: 30px;
  line-height: 30px;

  color: rgba(54, 54, 54);
`;

const DescriptionText = styled.p`
  font-size: 13px;
  line-height: 20px;

  color: rgba(54, 54, 54, 0.4);
`;

const AlbumEntertainment = styled.h1`
  font-size: 12px;
  line-height: 12px;

  padding: 8px 0px;

  color: rgba(54, 54, 54, 0.6);
`;

const AlbumListWrapper = styled.div`
  width: 990px;
  padding: 15px 0px 0px 0px;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumList = styled.div`
  width: 100%;
  padding: 10px 15px 10px 10px;

  display: grid;
  grid-template-columns: 0fr 1fr 1fr 1fr 1fr 0fr;
  align-items: center;

  box-shadow: ${({ active }) => (active ? "rgba(0, 0, 0, 0.2) 0px 20px 30px" : "none")};

  border-radius: 5px;

  transition: box-shadow 0.5s ease;

  cursor: pointer;
`;

const AlbumListCover = styled.div`
  width: 35px;

  margin: 0px 5px 0px 0px;

  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

  border-radius: 4px;
  overflow: hidden;
`;

const AlbumInfo = styled.span`
  font-size: 12px;
  line-height: 12px;

  @media screen and (max-width: 768px) {
    font-size: 8px;
    line-height: 8px;
  }
`;

const AlbumListIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  line-height: 12px;
`;

const TestAlbum = () => {
  const [albumList, setAlbumList] = useState([]);
  const [selectAlbum, setSelectAlbum] = useState({});
  const [selectId, setSelectId] = useState(0);

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  const onLoad = async () => {
    const musicArr = [];
    const response = await configService.getMusicList();

    _.forEach(response, (res) => {
      console.log(res);
      musicArr.push({
        id: Number(res.music_idx),
        title: res.music_title,
        description: res.music_description,
        cover: res.music_album_image,
        lp: res.music_lp_image,
        color: res.music_color,
        enter: res.music_plan,
        composition: res.music_composition,
        release: res.music_release,
      });
    });

    setAlbumList(musicArr);
    setSelectAlbum(musicArr[selectId]);
  };

  const selectMusic = (id) => {
    setSelectId(id);
    setSelectAlbum(albumList[id]);
  };

  return (
    <>
      <TopNavbar />
      <AlbumContainer>
        {!_.isEmpty(selectAlbum) && (
          <AlbumWrapper>
            <AlbumLeftSide>
              <AlbumImageWrap>
                <AlbumImage src={selectAlbum.cover} />
                <LpImageWrap>
                  <LpImage src={selectAlbum.lp} />
                </LpImageWrap>
              </AlbumImageWrap>
            </AlbumLeftSide>
            <AlbumRightSide>
              <AlbumDescription>
                <AlbumTitleText>{selectAlbum.title}</AlbumTitleText>
                <AlbumEntertainment>{selectAlbum.enter}</AlbumEntertainment>
                <DescriptionText>{selectAlbum.description}</DescriptionText>
              </AlbumDescription>
            </AlbumRightSide>
          </AlbumWrapper>
        )}
        <AlbumListWrapper>
          {_.map(albumList, (album, index) => (
            <AlbumList key={index} active={index === selectId} onClick={() => selectMusic(index)}>
              <AlbumListCover>
                <AlbumImage src={album.cover} />
              </AlbumListCover>
              <AlbumInfo>{album.title}</AlbumInfo>
              <AlbumInfo>{album.composition}</AlbumInfo>
              <AlbumInfo>{album.enter}</AlbumInfo>
              <AlbumInfo>{album.release}</AlbumInfo>
              <AlbumListIcon icon={faBars} />
            </AlbumList>
          ))}
        </AlbumListWrapper>
      </AlbumContainer>
    </>
  );
};

export default TestAlbum;
