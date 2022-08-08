import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlbumImage = styled.img`
  width: 100%;
  display: block;
`;

const AlbumListShadowWrapper = styled.div`
  position: relative;
`;

const AlbumListWrapper = styled.div`
  width: 990px;
  height: calc(55.08px * 5);
  padding-bottom: calc(55.08px * 4);

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  position: relative;

  ::-webkit-scrollbar {
    /* width: 5px;
    transition: background-color 0.5s ease; */
    display: none;
  }

  /* ::-webkit-scrollbar-thumb {
    background-color: rgba(54, 54, 54, 0.2);

    border-radius: 2px;

    &:hover {
      background-color: rgba(54, 54, 54, 0.5);
    }
  } */

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding-bottom: 0px;
    overflow-y: visible;
  }
`;

const AlbumSelectBar = styled.div`
  width: 100%;
  height: 55.08px;

  position: absolute;
  top: ${({ select }) => `calc(55.08px * ${select})`};
  left: 0;

  border-radius: 5px;

  background-color: ${({ color }) => color};

  z-index: 0;

  transition: background-color 0.5s ease-out, top 0.5s ease-out;

  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

const AlbumListShadow = styled.div`
  height: 180px;
  background: ${(props) =>
    `linear-gradient(180deg, hsla(0, 0%, 100%, 0), ${props.theme.backgroundColor})`};
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  z-index: 3;

  pointer-events: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const AlbumColumnWrapper = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
    display: none;
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

  z-index: 1;

  display: grid;
  grid-template-columns: 0fr 0fr 1fr 1fr 1fr 1fr 0fr;
  align-items: center;

  background-color: ${({ active, color }) => (active ? color : "")};

  ${(props) =>
    css`
      color: ${({ active, light }) =>
        active ? (light ? "black" : "white") : props.theme.titleTextColor};
    `}

  border-radius: 10px;

  transition: box-shadow 0.5s ease, background-color 0.5s ease;

  cursor: pointer;

  @media screen and (max-width: 768px) {
    grid-template-columns: 0fr 1fr 1fr 1fr 1fr 0fr;
  }
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
    display: none;
  }
`;

const AlbumInfoColum = styled.span`
  font-size: 12px;
  line-height: 12px;

  text-align: center;

  color: ${(props) => props.theme.titleTextColor};

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
    height: 13px;
    font-size: 11px;
    line-height: 11px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const AlbumListIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  line-height: 12px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
    line-height: 13px;
  }
`;

export {
  AlbumImage,
  AlbumListShadowWrapper,
  AlbumListWrapper,
  AlbumSelectBar,
  AlbumListShadow,
  AlbumColumnWrapper,
  AlbumColumn,
  AlbumLists,
  AlbumListCover,
  AlbumNumber,
  AlbumInfoColum,
  AlbumInfoDummy,
  AlbumInfo,
  AlbumListIcon,
};
