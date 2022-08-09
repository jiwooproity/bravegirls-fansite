import React, { useState, useEffect } from "react";

import _ from "lodash";

import { AlbumInfo, AlbumList, AlbumTrack } from "components";
import { Loading, Top } from "components";

import { utils } from "util/utils";
import { useStore } from "hooks";
import { musicService } from "services";

import {
  DarkThemeMode,
  DarkThemeImage,
  DarkThemeBackdrop,
  AlbumContainer,
} from "style";

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
  }, [
    selectId,
    setSelectId,
    albumList,
    setAlbumList,
    selectAlbum,
    setSelectAlbum,
  ]);

  const onLoadTrack = async () => {
    const trackArr = [];
    const params = { track_id: selectAlbum.id || selectId + 1 };
    const trackData = await musicService.trackList({ params });

    _.forEach(trackData, (res, index) => {
      trackArr.push({
        id: `0${index + 2}`,
        title: res.music_title,
        // subTitle: res.music_subtitle,
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
    const musicData = await musicService.musicList();

    _.forEach(musicData, (res) => {
      musicArr.push({
        id: Number(res.music_idx),
        title: res.music_title,
        description: res.music_description,
        descriptionSecond: res.music_description_second
          ? res.music_description_second
          : "",
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
      <Top />
      <DarkThemeMode active={themeStore.theme ? "true" : "false"}>
        <DarkThemeBackdrop active={themeStore.theme ? "true" : "false"} />
        <DarkThemeImage src={selectAlbum.cover} />
      </DarkThemeMode>
      <AlbumContainer>
        {loading ? (
          <>
            <AlbumInfo data={selectAlbum} />
            <AlbumList
              data={albumList}
              onceData={selectAlbum}
              setData={setAlbumList}
              selectValue={selectId}
              func={{ isLightColor, selectMusic, dragMusic }}
            />
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
