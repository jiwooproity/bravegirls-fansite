import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CanvasBoard = {};

CanvasBoard.Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 0px 15px 30px 15px;

  display: flex;
  justify-content: center;
`;

CanvasBoard.Wrapper = styled.div`
  width: 100%;
`;

CanvasBoard.ArtContainer = styled.div`
  width: 100%;
  overflow: hidden;
  -webkit-column-count: 7;
  -webkit-column-gap: 20px;
  -webkit-column-fill: auto;
  -moz-column-count: 7;
  -moz-column-gap: 20px;
  -moz-column-fill: auto;
  column-count: 7;
  column-gap: 20px;
  column-fill: auto;

  @media screen and (max-width: 1500px) {
    -webkit-column-count: 6;
    -webkit-column-gap: 20px;
    -webkit-column-fill: auto;
    -moz-column-count: 6;
    -moz-column-gap: 20px;
    -moz-column-fill: auto;
    column-count: 6;
    column-gap: 20px;
    column-fill: auto;
  }

  @media screen and (max-width: 1300px) {
    -webkit-column-count: 5;
    -webkit-column-gap: 20px;
    -webkit-column-fill: auto;
    -moz-column-count: 5;
    -moz-column-gap: 20px;
    -moz-column-fill: auto;
    column-count: 5;
    column-gap: 20px;
    column-fill: auto;
  }

  @media screen and (max-width: 1280px) {
    -webkit-column-count: 4;
    -webkit-column-gap: 20px;
    -webkit-column-fill: auto;
    -moz-column-count: 4;
    -moz-column-gap: 20px;
    -moz-column-fill: auto;
    column-count: 4;
    column-gap: 20px;
    column-fill: auto;
  }

  @media screen and (max-width: 768px) {
    -webkit-column-count: 2;
    -webkit-column-gap: 20px;
    -webkit-column-fill: auto;
    -moz-column-count: 2;
    -moz-column-gap: 20px;
    -moz-column-fill: auto;
    column-count: 2;
    column-gap: 20px;
    column-fill: auto;
  }
`;

CanvasBoard.ImageContaienr = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

CanvasBoard.ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  &:hover {
    svg {
      opacity: 1;
    }

    img {
      transform: scale(1.1);
    }
  }

  cursor: pointer;
`;

CanvasBoard.Image = styled.img`
  width: 100%;
  display: block;

  transition: transform 0.5s ease;
`;

CanvasBoard.Backdrop = styled.div`
  width: 100%;
  height: 100%;

  padding: 5px;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);

  opacity: 0;
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    opacity: 1;

    h1 {
      opacity: 1;
    }
  }

  transition: opacity 0.5s ease;
`;

CanvasBoard.DownloadBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

CanvasBoard.DownloadButton = styled(FontAwesomeIcon)`
  padding: 7px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  opacity: 0;

  transition: opacity 0.5s ease;
`;

CanvasBoard.StatusBox = styled.div`
  width: 100%;
`;

CanvasBoard.Description = styled.span`
  width: 30px;
  font-size: 15px;
  line-height: 15px;
  transition: opacity 0.5s ease;

  color: rgba(255, 255, 255, 0.9);

  transition: opacity 0.5s ease, color 0.5s ease;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export { CanvasBoard };
