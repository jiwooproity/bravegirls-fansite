import React from "react";
import styled from "styled-components";

import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AlbumImage = styled.img`
  width: 100%;
  display: block;
`;

const AlbumListWrapper = styled.div`
  width: 990px;
  height: calc(55.08px * 5);

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 5px;

    transition: background-color 0.5s ease;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(54, 54, 54, 0.2);

    border-radius: 2px;

    &:hover {
      background-color: rgba(54, 54, 54, 0.5);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumColumnWrapper = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AlbumColumn = styled.div`
  width: 100%;
  padding: 10px 15px 10px 10px;

  display: grid;
  grid-template-columns: 0fr 0fr 1fr 1fr 1fr 1fr 0fr 0fr;
  align-items: center;
`;

const AlbumLists = styled.div`
  width: 100%;
  padding: 10px 15px 10px 10px;

  display: grid;
  grid-template-columns: 0fr 0fr 1fr 1fr 1fr 1fr 0fr;
  align-items: center;

  box-shadow: ${({ active }) =>
    active
      ? "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"
      : "none"};

  background-color: ${({ active, color }) => (active ? color : "")};

  color: ${({ active, light }) =>
    active ? (light ? "black" : "white") : "rgba(54, 54, 54)"};

  border-radius: 10px;

  transition: box-shadow 0.5s ease;

  cursor: pointer;

  transition: background-color 0.5s, color 0.5s;
`;

const AlbumListCover = styled.div`
  width: 35px;

  margin: 0px 5px 0px 0px;

  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

  border-radius: 4px;
  overflow: hidden;
`;

const AlbumNumber = styled.span`
  width: 25px;
  text-align: center;

  padding: 0px 10px 0px 0px;

  font-size: 12px;
  line-height: 12px;

  @media screen and (max-width: 768px) {
    font-size: 8px;
    line-height: 8px;
  }
`;

const AlbumInfoColum = styled.span`
  font-size: 12px;
  line-height: 12px;

  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 8px;
    line-height: 8px;
  }

  &:nth-child(1) {
    width: 25px;
  }

  &:nth-child(2) {
    width: 35px;

    margin: 0px 5px 0px 0px;
  }

  &:nth-child(7) {
    svg {
      color: transparent;
    }
  }
`;

const AlbumInfoDummy = styled.div`
  width: 10px;

  &:nth-child(1) {
    width: 25px;
  }
`;

const AlbumInfo = styled.span`
  font-size: 12px;
  line-height: 12px;
  padding: 0px 5px;

  text-align: center;

  @media screen and (max-width: 768px) {
    height: 10px;
    font-size: 8px;
    line-height: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const AlbumListIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  line-height: 12px;
`;

const AlbumList = (props) => {
  const { data, selectValue, func } = props;

  return (
    <>
      <AlbumColumnWrapper>
        <AlbumColumn>
          <AlbumInfoDummy />
          <AlbumInfoColum>커버</AlbumInfoColum>
          <AlbumInfoColum>타이틀</AlbumInfoColum>
          <AlbumInfoColum>작곡, 작사, 편곡</AlbumInfoColum>
          <AlbumInfoColum>기획</AlbumInfoColum>
          <AlbumInfoColum>발매일</AlbumInfoColum>
          <AlbumInfoColum>
            <AlbumListIcon icon={faBars} />
          </AlbumInfoColum>
          <AlbumInfoDummy />
        </AlbumColumn>
      </AlbumColumnWrapper>
      <AlbumListWrapper>
        {_.map(data, (album, index) => (
          <AlbumLists
            key={index}
            color={album.color}
            light={func.isLightColor(album.id)}
            active={index === selectValue}
            onClick={() => func.selectMusic(index)}
          >
            <AlbumNumber>{album.id}</AlbumNumber>
            <AlbumListCover>
              <AlbumImage src={album.cover} />
            </AlbumListCover>
            <AlbumInfo>{album.title}</AlbumInfo>
            <AlbumInfo>{album.composition}</AlbumInfo>
            <AlbumInfo>{album.enter}</AlbumInfo>
            <AlbumInfo>{album.release}</AlbumInfo>
            <AlbumListIcon icon={faBars} />
          </AlbumLists>
        ))}
      </AlbumListWrapper>
    </>
  );
};

export default AlbumList;
