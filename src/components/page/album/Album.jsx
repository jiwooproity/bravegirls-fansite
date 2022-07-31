import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";
import { useEffect } from "react";
import { configService } from "service/configService";

import AlbumList from "./AlbumList";
import AlbumInfo from "./AlbumInfo";
import AlbumTrack from "./AlbumTrack";
import { Loading } from "components";

import useStore from "hooks/useStore";
import { utils } from "util/utils";

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

  position: relative;

  @media screen and (max-width: 768px) {
    padding: 0px 15px 30px 15px;
  }
`;

const Album = () => {
  const { themeStore } = useStore();
  const [albumList, setAlbumList] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [selectAlbum, setSelectAlbum] = useState({});
  const [selectId, setSelectId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onLoad();
    onLoadTrack();
    utils.onScrollTop();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onLoadTrack();
    // eslint-disable-next-line
  }, [selectId, setSelectId, albumList, setAlbumList, selectAlbum, setSelectAlbum]);

  const onLoadTrack = async () => {
    const trackArr = [];
    const trackData = await configService.getTrackList({ track_id: selectAlbum.id });

    _.forEach(trackData, (res, index) => {
      trackArr.push({
        id: `0${index + 2}`,
        title: res.music_title,
        description: res.music_description,
        color: res.music_color,
        lyricist: res.music_lyricist,
        composition: res.music_composition,
        arrangement: res.music_arrangement,
      });
    });

    trackArr.unshift({ ...selectAlbum, id: `01` });

    setTrackList(trackArr);
  };

  const onLoad = async () => {
    setLoading(false);
    const musicArr = [];
    const musicData = await configService.getMusicList();

    _.forEach(musicData, (res) => {
      musicArr.push({
        id: Number(res.music_idx),
        title: res.music_title,
        description: res.music_description,
        descriptionSecond: res.music_description_second ? res.music_description_second : "",
        cover: res.music_album_image,
        lp: res.music_lp_image,
        color: res.music_color,
        enter: res.music_plan,
        lyricist: res.music_lyricist,
        composition: res.music_composition,
        arrangement: res.music_arrangement,
        release: res.music_release,
      });
    });

    setAlbumList(musicArr);
    setSelectAlbum(musicArr[selectId]);
    setLoading(true);
  };

  const dragMusic = (destinationId, items) => {
    setSelectId(destinationId);
    setSelectAlbum(items[destinationId]);
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
            <AlbumTrack data={trackList} color={selectAlbum.color} />
          </>
        ) : (
          <Loading />
        )}
      </AlbumContainer>
    </>
  );
};

export default Album;
