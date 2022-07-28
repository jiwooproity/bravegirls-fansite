import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";
import { useEffect } from "react";
import { configService } from "service/configService";

import { Loading } from "components";
import AlbumList from "./AlbumList";
import AlbumInfo from "./AlbumInfo";
import AlbumSidebar from "./AlbumSidebar";

const TopNavbar = styled.div`
  width: 100%;
  height: 85px;
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

    _.forEach(response, (res) => {
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
    setLoading(true);
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
      <AlbumContainer>
        {loading ? (
          <>
            <AlbumInfo data={selectAlbum} />
            <AlbumList
              data={albumList}
              selectValue={selectId}
              func={{ isLightColor, selectMusic }}
            />
          </>
        ) : (
          <Loading />
        )}
      </AlbumContainer>
      <AlbumSidebar data={albumList} />
    </>
  );
};

export default Album;
