import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import _ from "lodash";

import { Top } from "components";

import { SketchPicker } from "react-color";
import { lineWidth, eraseLine } from "constant";
import { utils } from "util/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const CanvasContainer = styled.div`
  width: 100%;
  padding: 0px 15px;

  display: flex;
  justify-content: center;

  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 0px 0px;
  }
`;

const CanvasWrapper = styled.div`
  width: 990px;
  min-height: calc(100vh - 85px);
  padding: 0px 0px 30px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    /* width: 100%; */
    /* display: none; */
    min-height: calc(100vh - 85px);
    padding: 0px;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const CanvasPickerBox = styled.div`
  ${({ active }) =>
    active &&
    css`
      width: 100%;
      height: 100%;
    `}

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CanvasUpload = styled.label`
  width: 100%;
  display: ${({ active }) => (active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border 0.5s ease;
  border-radius: 5px;
  padding: 15px 0px;
  margin: 0px 15px;
  border: 1px dotted ${(props) => props.theme.backgroundOpacityColor};

  &:hover {
    h1 {
      transform: rotate(360deg);
    }
  }
`;

const CanvasUploadText = styled.h1`
  font-size: 15px;
  line-height: 15px;
  color: ${(props) => props.theme.backgroundOpacityColor};

  transition: transform 0.5s ease;
`;

const CanvasUploadInput = styled.input`
  display: none;
`;

const MainCanvas = styled.canvas`
  opacity: 1;
  z-index: 1;
  touch-action: none;

  &:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    @media screen and (max-width: 768px) {
      top: 0;
      transform: translateX(-50%);
    }
  }

  display: ${({ active }) => (active ? "none" : "block")};

  border-radius: 5px;

  @media screen and (max-width: 768px) {
    /* opacity: 0; */
    /* pointer-events: none; */
    width: 100%;
    border-radius: 0px;
  }

  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: opacity 0.5s ease;
`;

const PickerWrapper = styled.div`
  opacity: ${({ active }) => (active ? "0" : "1")};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: -235px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;

  transition: opacity 0.5s ease;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const PickerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StrokeSelect = styled.select`
  border: 1px solid rgba(54, 54, 54, 0.1);
`;

const CustomPicker = styled(SketchPicker)``;

const StrokeOption = styled.option``;

const StrokeButton = styled.button`
  font-size: 14px;
  line-height: 14px;
  padding: 5px 8px;
  background-color: transparent;
  border: none;

  &:hover {
    background-color: rgba(54, 54, 54);
    color: white;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: rgba(54, 54, 54);
      color: white;
    `}

  cursor: pointer;

  transition: color 0.5s ease, background-color 0.5s ease;
`;

const SelectText = styled.span`
  font-size: 15px;
  line-height: 15px;

  color: rgba(54, 54, 54);
  border: 1px solid rgba(54, 54, 54, 0.1);
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
`;

const EraserModeIconWrapper = styled.div`
  width: ${({ stroke }) => `${stroke}px`};
  height: ${({ stroke }) => `${stroke}px`};
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  transform: translate(-50%, -50%);
  border: 1px solid rgba(245, 245, 245, 0.5);
  border-radius: 50%;

  opacity: ${({ active }) => (active ? "1" : "0")};

  pointer-events: none;

  z-index: 999;

  transition: opacity 0.5s ease;
`;

const EraserModeIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: white;
`;

const Canvas = () => {
  let img = new Image();
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [ctxTag, setCtxTag] = useState();
  const [bgCtxTag, setBgCtxTag] = useState();
  const [stroke, setStroke] = useState(1.5);
  const [eraseStroke, setEraseStroke] = useState(10);
  const [color, setColor] = useState({
    rgb: { r: "0", g: "0", b: "0", a: "1" },
  });
  const [erase, setErase] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [uploadImage, setUploadImage] = useState(true);

  // 지우개 토글 상태일 경우 지우개 표시
  useEffect(() => {
    const eraseIcon = document.querySelector(".eraser");

    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      eraseIcon.style.left = mouseX + "px";
      eraseIcon.style.top = mouseY + "px";
    });
  });

  const setCanvas = (ctx, data) => {
    let calcHeight = 0;

    if (utils.isMobile()) {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = (img.height / img.width) * window.innerWidth;
      calcHeight = (img.height / img.width) * ctx.canvas.width;
    } else {
      ctx.canvas.width = data;
      ctx.canvas.height = (img.height / img.width) * data;
      calcHeight = (img.height / img.width) * ctx.canvas.width;
    }

    return [calcHeight, ctx];
  };

  const onLoad = (e) => {
    setUploadImage(true);
    const file = e.target.files;
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    reader.readAsDataURL(file[0]);

    img.onload = () => {
      const canvas = canvasRef.current;
      const background = bgCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const bgCtx = background.getContext("2d");
      // const isOver = img.width > 990;
      const isHori = img.width > img.height;
      const getCanvas = setCanvas(ctx, isHori ? 990 : 440);
      const getBgCanvas = setCanvas(bgCtx, isHori ? 990 : 440);

      getBgCanvas[1].drawImage(img, 0, 0, bgCtx.canvas.width, getBgCanvas[0]);
      setCtxTag(getCanvas[1]);
      setBgCtxTag(getBgCanvas[1]);

      setUploadImage(false);
    };
  };

  const startDraw = () => {
    setIsDrawing(true);
    ctxTag.beginPath();
  };

  const finishDraw = () => {
    setIsDrawing(false);
    ctxTag.closePath();
  };

  const onDrawing = ({ nativeEvent }) => {
    let X = 0;
    let Y = 0;

    if (utils.isMobile()) {
      // 모바일의 경우
      const { targetTouches } = nativeEvent;

      if (targetTouches[0]) {
        const canvasDom = document.getElementById("canvasJS");
        const { offsetLeft, offsetTop } = canvasDom;
        const { pageX, pageY } = targetTouches[0];

        X = Math.floor(pageX) - offsetLeft;
        Y = Math.floor(pageY) - offsetTop - 85;
      }
    } else {
      // PC의 경우
      const { offsetX, offsetY } = nativeEvent;

      X = offsetX;
      Y = offsetY;
    }

    const draw = () => {
      if (utils.isMobile()) {
        if (!isDrawing) {
          return;
        } else {
          ctxTag.lineTo(X, Y);
          ctxTag.stroke();
          ctxTag.moveTo(X, Y);
        }
      } else {
        if (!isDrawing) {
          ctxTag.moveTo(X, Y);
        } else {
          ctxTag.lineTo(X, Y);
          ctxTag.stroke();
        }
      }
    };

    const remove = () => {
      ctxTag.clearRect(
        X - eraseStroke / 2,
        Y - eraseStroke / 2,
        eraseStroke,
        eraseStroke
      );
    };

    const haveTag = () => {
      ctxTag.lineCap = "round";
      ctxTag.lineJoin = "round";
      ctxTag.lineWidth = stroke;
      !erase && draw();
      erase && isDrawing && remove();
    };

    ctxTag && haveTag();
  };

  // 색깔 변경
  const onChangeColor = (color) => {
    if (ctxTag) {
      ctxTag.strokeStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }

    setColor({ rgb: color.rgb });
  };

  // 선 굵기 변경
  const onChangeStroke = (e) => {
    const { value } = e.target;
    ctxTag.lineWidth = value;
    setStroke(value);
  };

  const onChangeErase = (e) => {
    const { value } = e.target;
    setEraseStroke(value);
  };

  const onDelete = () => {
    if (ctxTag) {
      ctxTag.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else {
      alert("사진을 등록 해주세요.");
    }
  };

  const saveImage = async () => {
    if (uploadImage) return;

    bgCtxTag.drawImage(canvasRef.current, 0, 0);
    let imageURL = bgCanvasRef.current.toDataURL("image/png");

    // const data = new FormData();
    // data.append("file", imageURL);
    // data.append("upload_preset", "dbw3ells");

    // await fetch(`https://api.cloudinary.com/v1_1/jiwooproity/image/upload`, {
    //   method: "POST",
    //   body: data,
    // });

    const now = new Date(); // 현재 날짜 및 시간
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let a = document.createElement("a");
    a.href = imageURL;
    a.download = `${hour}_${minutes}_${seconds}_picture`;
    a.click();
  };

  return (
    <>
      <Top />
      <CanvasContainer>
        {/* <MediaBlockWrapper>
          <MediaBlockText>PC버전으로 접속 해주세요.</MediaBlockText>
        </MediaBlockWrapper> */}
        <CanvasWrapper>
          <CanvasPickerBox active={uploadImage}>
            <CanvasUpload htmlFor={"image_upload"} active={uploadImage}>
              <CanvasUploadText>사진을 업로드 해주세요.</CanvasUploadText>
              <CanvasUploadInput
                type={"file"}
                id={"image_upload"}
                onChange={onLoad}
              />
            </CanvasUpload>
            <MainCanvas
              ref={bgCanvasRef}
              id="bgCanvasjs"
              active={uploadImage}
            />
            <MainCanvas
              ref={canvasRef}
              id="canvasJS"
              onMouseDown={startDraw}
              onTouchStart={startDraw}
              onMouseUp={finishDraw}
              onTouchEnd={finishDraw}
              onMouseLeave={finishDraw}
              onMouseMove={onDrawing}
              onTouchMove={onDrawing}
              active={uploadImage}
            />
            <PickerWrapper active={uploadImage}>
              <PickerBox>
                <CustomPicker color={color.rgb} onChange={onChangeColor} />
                <ButtonWrapper>
                  <SelectText>브러쉬</SelectText>
                  <StrokeSelect onChange={onChangeStroke}>
                    {_.map(lineWidth, (line, index) => (
                      <StrokeOption key={index} value={line.value}>
                        {`${line.name}px`}
                      </StrokeOption>
                    ))}
                  </StrokeSelect>
                  <SelectText>지우개</SelectText>
                  <StrokeSelect onChange={onChangeErase}>
                    {_.map(eraseLine, (line, index) => (
                      <StrokeOption key={index} value={line.value}>
                        {`${line.name}px`}
                      </StrokeOption>
                    ))}
                  </StrokeSelect>
                </ButtonWrapper>
              </PickerBox>
              <PickerBox>
                <ButtonWrapper>
                  <StrokeButton onClick={() => saveImage()} color={color}>
                    다운로드
                  </StrokeButton>
                  <StrokeButton onClick={() => onLoad(true)} color={color}>
                    새로고침
                  </StrokeButton>
                </ButtonWrapper>
                <ButtonWrapper>
                  <StrokeButton
                    onClick={() => setErase(!erase)}
                    active={erase}
                    color={color}
                  >
                    지우개 (토글)
                  </StrokeButton>
                  <StrokeButton onClick={() => onDelete()} color={color}>
                    지우기
                  </StrokeButton>
                </ButtonWrapper>
              </PickerBox>
            </PickerWrapper>
          </CanvasPickerBox>
        </CanvasWrapper>
      </CanvasContainer>
      <EraserModeIconWrapper
        className="eraser"
        active={erase}
        stroke={eraseStroke}
      >
        <EraserModeIcon icon={faEraser} />
      </EraserModeIconWrapper>
    </>
  );
};

export default Canvas;
