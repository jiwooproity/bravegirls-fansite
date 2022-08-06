import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import _ from "lodash";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { Top } from "components";
import { canvasService } from "service/canvasService";
import { Fade } from "react-reveal";

const BoardContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 0px 15px 30px 15px;

  display: flex;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  width: 100%;
`;

const ArtContainer = styled.div`
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

const ArtImageContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
`;

const ArtImageWrapper = styled.div`
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

const ArtImage = styled.img`
  width: 100%;
  display: block;

  transition: transform 0.5s ease;
`;

const ArtImageBackdrop = styled.div`
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

const ArtDownloadBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const ArtDownloadButton = styled(FontAwesomeIcon)`
  padding: 7px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  opacity: 0;

  transition: opacity 0.5s ease;
`;

const ArtStatusBox = styled.div`
  width: 100%;
`;

const ArtDescription = styled.span`
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

const CanvasBoard = () => {
  const navigate = useNavigate();
  const [canvasList, setCanvasList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    setLoading(false);
    const canvasArr = [];
    const response = await canvasService.canvasList();
    let img = new Image();

    _.forEach(response, (res) => {
      img.src = res.canvas_art;

      canvasArr.push({
        id: res.canvas_idx,
        name: res.canvas_nickname,
        art: res.canvas_art,
        title: res.canvas_title,
        description: res.canvas_description,
      });
    });

    setCanvasList(canvasArr);
    setLoading(true);
  };

  const onDetail = ({ id }) => {
    navigate(`/canvas/board/${id}`);
  };

  // 이미지 다운로드
  const onDownload = ({ canvas }) => {
    const image_split = canvas.art.split(".");
    const image_url = image_split[image_split.length - 1];

    fetch(canvas.art, {
      method: "GET",
      header: {},
    }).then((res) => {
      res.arrayBuffer().then((buffer) => {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${canvas.title}.${image_url}`);
        document.body.appendChild(link);
        link.click();
      });
    });
  };

  return (
    <>
      <Top />
      <BoardContainer>
        {loading ? (
          <BoardWrapper>
            <ArtContainer>
              {_.map(canvasList, (canvas, index) => (
                <Fade bottom>
                  <ArtImageContainer>
                    <ArtImageWrapper key={index}>
                      <ArtImage src={canvas.art} />
                      <ArtImageBackdrop onClick={() => onDetail({ id: canvas.id })}>
                        <ArtStatusBox>
                          <ArtDescription>{`${canvas.name} / ${canvas.title}`}</ArtDescription>
                        </ArtStatusBox>
                      </ArtImageBackdrop>
                      <ArtDownloadBox onClick={() => onDownload({ canvas })}>
                        <ArtDownloadButton icon={faDownload} />
                      </ArtDownloadBox>
                    </ArtImageWrapper>
                  </ArtImageContainer>
                </Fade>
              ))}
            </ArtContainer>
          </BoardWrapper>
        ) : null}
      </BoardContainer>
    </>
  );
};

export default CanvasBoard;
