import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { Top } from "components";
import { canvasService } from "services";

import {
  ArtContainer,
  ArtDescription,
  ArtDownloadBox,
  ArtDownloadButton,
  ArtImage,
  ArtImageBackdrop,
  ArtImageContainer,
  ArtImageWrapper,
  ArtStatusBox,
  BoardContainer,
  BoardWrapper,
} from "style";

import { useStore } from "hooks";

const CanvasBoard = () => {
  const navigate = useNavigate();
  const { loadingStore } = useStore();
  const [canvasList, setCanvasList] = useState([]);

  useEffect(() => {
    onLoad();
    loadingStore.setLoading(false);
    // eslint-disable-next-line
  }, []);

  const onLoad = async () => {
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
    setTimeout(() => {
      loadingStore.setLoading(true);
    }, 500);
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
        <BoardWrapper>
          <ArtContainer>
            {_.map(canvasList, (canvas, index) => (
              <ArtImageContainer key={index}>
                <ArtImageWrapper>
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
            ))}
          </ArtContainer>
        </BoardWrapper>
      </BoardContainer>
    </>
  );
};

export default CanvasBoard;
