import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { Top } from "components";
import { canvasService } from "services";

import { useStore } from "hooks";

import { CanvasBoard as CSS } from "style";

const CanvasBoard = () => {
  const navigate = useNavigate();
  const { loadingStore, toastStore } = useStore();
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

      toastStore.showToast({ status: 0, msg: `${canvas.name}님의 작품이 다운로드 되었습니다.` });
    });
  };

  return (
    <>
      <Top />
      <CSS.Container>
        <CSS.Wrapper>
          <CSS.ArtContainer>
            {_.map(canvasList, (canvas, index) => (
              <CSS.ImageContaienr key={index}>
                <CSS.ImageWrapper>
                  <CSS.Image src={canvas.art} />
                  <CSS.Backdrop onClick={() => onDetail({ id: canvas.id })}>
                    <CSS.StatusBox>
                      <CSS.Description>{`${canvas.name} / ${canvas.title}`}</CSS.Description>
                    </CSS.StatusBox>
                  </CSS.Backdrop>
                  <CSS.DownloadBox onClick={() => onDownload({ canvas })}>
                    <CSS.DownloadButton icon={faDownload} />
                  </CSS.DownloadBox>
                </CSS.ImageWrapper>
              </CSS.ImageContaienr>
            ))}
          </CSS.ArtContainer>
        </CSS.Wrapper>
      </CSS.Container>
    </>
  );
};

export default CanvasBoard;
