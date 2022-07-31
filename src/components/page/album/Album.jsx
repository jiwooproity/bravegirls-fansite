import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";
import { useEffect } from "react";
import { configService } from "service/configService";

import { Loading } from "components";
import AlbumList from "./AlbumList";
import AlbumInfo from "./AlbumInfo";
import useStore from "hooks/useStore";

const TopNavbar = styled.div`
  width: 100%;
  height: 85px;

  position: relative;
  z-index: 1;
`;

const DarkThemeMode = styled.div`
  width: 100%;
  height: 500px;

  opacity: ${({ active }) => (active === "true" ? "1" : "0")};

  position: absolute;
  top: 0;
  left: 0;

  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: 500px;
  }

  transition: opacity 1s ease;
`;

const DarkThemeImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;

  transform: scale(30);

  z-index: 0;
`;

const DarkThemeBackdrop = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: ${(props) => `linear-gradient(180deg, hsla(0, 0%, 100%, 0), ${props.theme.backgroundColor})`};

  background-color: ${({ active }) => (active === "true" ? "rgba(54, 54, 54, 0.5)" : "")};
  backdrop-filter: blur(150px);

  z-index: 1;
`;

const AlbumContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 0px 15px 30px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0px 15px 30px 15px;
  }
`;

const Album = () => {
  const { themeStore } = useStore();
  const [albumList, setAlbumList] = useState([]);
  const [selectAlbum, setSelectAlbum] = useState({});
  const [selectId, setSelectId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  const onLoad = async () => {
    const musicArr = [];
    const response = await configService.getMusicList();
    setLoading(false);

    _.forEach(response, (res, index) => {
      musicArr.push({
        id: Number(res.music_idx),
        title: res.music_title,
        description: res.music_description,
        descriptionSecond: res.music_description_second ? res.music_description_second : "",
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
    setLoading(true);
  };

  const dragMusic = (id, items) => {
    setSelectId(id);
    setSelectAlbum(items[id]);
    setAlbumList(items);
  };

  const selectMusic = (id) => {
    setSelectId(id);
    setSelectAlbum(albumList[id]);
  };

  const isLightColor = (id) => {
    switch (id) {
      case 3:
        return true;
      case 8:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <TopNavbar />
      <DarkThemeMode active={themeStore.theme ? "true" : "false"}>
        <DarkThemeBackdrop active={themeStore.theme ? "true" : "false"} />
        <DarkThemeImage src={selectAlbum.cover} />
      </DarkThemeMode>
      <AlbumContainer>
        {loading ? (
          <>
            <AlbumInfo data={selectAlbum} />
            <AlbumList data={albumList} onceData={selectAlbum} setData={setAlbumList} selectValue={selectId} func={{ isLightColor, selectMusic, dragMusic }} />
          </>
        ) : (
          <Loading />
        )}
      </AlbumContainer>
    </>
  );
};

export default Album;
