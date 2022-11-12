import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CanvasBoard = {};

CanvasBoard.Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 0px 60px 30px 60px;

  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 0px 15px 30px 15px;
  }
`;

CanvasBoard.Wrapper = styled.div`
  width: 100%;
`;

CanvasBoard.ArtContainer = styled.div`
  column-width: 250px;
  column-gap: 15px;

  @media screen and (max-width: 768px) {
    column-width: 150px;
  }
`;

CanvasBoard.ImageContaienr = styled.figure`
  display: inline-block;
  overflow: hidden;
  margin: 0;
  margin-bottom: 15px;
  /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); */
`;

CanvasBoard.Section = styled.div`
  width: 100%;
  overflow: hidden;

  &:nth-child(1) {
    border-radius: 10px;
  }
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
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  transition: opacity 0.5s ease;

  color: ${({ theme }) => theme.titleTextColor};

  transition: opacity 0.5s ease, color 0.5s ease;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

CanvasBoard.UserStatus = styled.div`
  width: 100%;
  padding: 5px 0px 0px 0px;
  display: flex;
  align-items: center;
`;

CanvasBoard.UserProfile = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 50%;
`;

CanvasBoard.User = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  padding: 0px 0px 0px 5px;

  transition: opacity 0.5s ease;

  color: ${({ theme }) => theme.titleTextColor};

  transition: opacity 0.5s ease, color 0.5s ease;

  white-space: nowrap;
  text-overflow: ellipsis;
`;

export { CanvasBoard };
