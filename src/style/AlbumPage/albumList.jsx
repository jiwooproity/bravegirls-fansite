import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlbumList = {};

AlbumList.CoverImage = styled.img`
  width: 100%;

  display: block;
`;

AlbumList.LinearShadowWrapper = styled.div`
  position: relative;
`;

AlbumList.Wrapper = styled.div`
  width: 990px;
  height: calc(55.08px * 5);
  padding: 0px 0px calc(55.08px * 4) 0px;

  display: flex;
  flex-direction: column;
  position: relative;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 0px 0px 0px 0px;

    overflow-y: visible;
  }
`;

AlbumList.SelectBar = styled.div`
  width: 100%;
  height: 55.08px;

  position: absolute;
  top: ${({ select }) => `calc(55.08px * ${select})`};
  left: 0px;

  border-radius: 5px;

  background-color: ${({ color }) => color};

  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  z-index: 1;

  transition: background-color 0.5s ease-out, top 0.5s ease-out;
`;

AlbumList.LinearShadow = styled.div`
  height: 180px;

  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;

  content: "";
  background: ${({ theme }) => `linear-gradient(180deg, hsla(0, 0%, 100%, 0), ${theme.backgroundColor})`};

  pointer-events: none;
  z-index: 3;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

AlbumList.ColumnWrapper = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;

    display: none;
  }
`;

AlbumList.Column = styled.div`
  width: 100%;
  padding: 10px 15px 10px 10px;

  display: grid;
  grid-template-columns: 0fr 0fr 1fr 1fr 1fr 1fr 0fr 0fr;
  align-items: center;
`;

AlbumList.List = styled.div`
  width: 100%;
  padding: 10px 15px 10px 10px;

  display: grid;
  grid-template-columns: 0fr 0fr 1fr 1fr 1fr 1fr 0fr;
  align-items: center;

  border-radius: 10px;

  background-color: ${({ active, color }) => (active ? color : "")};
  color: ${({ active, light, theme }) => (active ? (light ? "black" : "white") : theme.titleTextColor)};

  z-index: 1;
  transition: box-shadow 0.5s ease, background-color 0.5s ease;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    grid-template-columns: 0fr 1fr 1fr 1fr 1fr 0fr;
  }
`;

AlbumList.ListCover = styled.div`
  width: 35px;
  margin: 0px 5px 0px 0px;

  border-radius: 4px;

  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  overflow: hidden;
`;

AlbumList.Number = styled.span`
  font-size: 12px;
  line-height: 12px;

  width: 25px;
  padding: 0px 10px 0px 0px;

  text-align: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

AlbumList.Info = styled.span`
  font-size: 12px;
  line-height: 12px;
  text-align: center;

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

  color: ${({ theme }) => theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 8px;
    line-height: 8px;
  }
`;

AlbumList.Dummy = styled.div`
  width: 10px;

  &:nth-child(1) {
    width: 25px;
  }
`;

AlbumList.Infos = styled.span`
  font-size: 12px;
  line-height: 12px;

  padding: 0px 5px;

  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 11px;
    line-height: 11px;
    white-space: nowrap;
    text-overflow: ellipsis;

    height: 13px;

    overflow: hidden;
  }
`;

AlbumList.Icon = styled(FontAwesomeIcon)`
  font-size: 12px;
  line-height: 12px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
    line-height: 13px;
  }
`;

export { AlbumList };
