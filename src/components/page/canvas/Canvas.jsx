import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import _ from "lodash";

import canvasImage01 from "static/img/canvas_01.jpg";
import canvasImage02 from "static/img/canvas_02.jpg";
import canvasImage03 from "static/img/canvas_03.jpg";
import canvasImage04 from "static/img/canvas_04.jpg";
import canvasImage05 from "static/img/canvas_05.jpg";

import { Top } from "components";

import { HuePicker } from "react-color";
import { lineWidth } from "constant";

const CanvasContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 0px 15px 30px 15px;

  display: flex;
  justify-content: center;
`;

const MediaBlockWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  background-color: white;

  @media screen and (max-width: 768px) {
    opacity: 1;
  }

  z-index: 2;
`;

const MediaBlockText = styled.h1`
  font-size: 3vw;
  line-height: 3vw;

  color: rgba(54, 54, 54);

  opacity: 0;

  @media screen and (max-width: 768px) {
    opacity: 1;
  }

  transition: opacity 0.5s ease;
`;

const CanvasWrapper = styled.div`
  width: 990px;
  height: 100%;
`;

const CanvasPickerBox = styled.div`
  width: 100%;
  height: 660px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const MainCanvas = styled.canvas`
  display: block;
  opacity: 1;

  border-radius: 5px;

  @media screen and (max-width: 768px) {
    opacity: 0;
    pointer-events: none;
  }

  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: opacity 0.5s ease;
`;

const PickerWrapper = styled.div`
  width: 990px;

  padding: 15px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: -65px;
  left: 50%;

  border-radius: 5px;

  transform: translateX(-50%);

  background-color: rgba(255, 255, 255, 1);

  box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
`;

const PickerBox = styled.div`
  display: flex;
  align-items: center;
`;

const StrokeSelect = styled.select`
  width: 80px;
  height: 20px;

  margin: 0px 5px;
`;

const CustomPicker = styled(HuePicker)`
  padding: 10px;
`;

const StrokeOption = styled.option``;

const StrokeButton = styled.button`
  font-size: 14px;
  line-height: 14px;

  padding: 5px 8px;
  margin: 0px 0px 0px 5px;

  background-color: transparent;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: ${({ color }) => color};
    color: white;
  }

  cursor: pointer;

  transition: color 0.5s ease, background-color 0.5s ease;
`;

const Canvas = () => {
  let img = new Image();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctxTag, setCtxTag] = useState();
  const [random, setRandom] = useState(0);
  const [stroke, setStroke] = useState(1.5);
  const [color, setColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);

  // 테스트 이미지
  const imageArr = [
    canvasImage01,
    canvasImage02,
    canvasImage03,
    canvasImage04,
    canvasImage05,
  ];

  useEffect(() => {
    onLoad(true);
    // eslint-disable-next-line
  }, []);

  const setCanvas = (ctx, data) => {
    ctx.canvas.width = data;
    ctx.canvas.height = (img.height / img.width) * data;
    let calcHeight = (img.height / img.width) * ctx.canvas.width;

    return [calcHeight, ctx];
  };

  const onLoad = (isLoad) => {
    let math = Math.floor(Math.random() * imageArr.length);
    img.src = imageArr[isLoad ? math : random];

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false });
      const isOver = img.width > 990;
      const isHori = img.width > img.height;
      const getCanvas = setCanvas(
        ctx,
        isOver ? (isHori ? 990 : 440) : img.width
      );

      contextRef.current = getCanvas[1];
      getCanvas[1].drawImage(img, 0, 0, ctx.canvas.width, getCanvas[0]);
      setCtxTag(getCanvas[1]);
      setRandom(isLoad ? math : random);
    };
  };

  const startDraw = () => {
    setIsDrawing(true);
  };

  const finishDraw = () => {
    setIsDrawing(false);
  };

  const onDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctxTag) {
      ctxTag.lineCap = "round";
      ctxTag.lineJoin = "round";
      ctxTag.strokeStyle = color;
      ctxTag.lineWidth = stroke;

      if (!isDrawing) {
        ctxTag.beginPath();
        ctxTag.moveTo(offsetX, offsetY);
      } else {
        ctxTag.lineTo(offsetX, offsetY);
        ctxTag.stroke();
      }
    }
  };

  // 색깔 변경
  const onChangeColor = (color) => {
    ctxTag.strokeStyle = color.hex;
    setColor(color.hex);
  };

  // 선 굵기 변경
  const onChangeStroke = (e) => {
    const { value } = e.target;
    ctxTag.lineWidth = value;
    setStroke(value);
  };

  const saveImage = async () => {
    const canvas = canvasRef.current;
    let imageURL = canvas.toDataURL("image/png");

    const data = new FormData();
    data.append("file", imageURL);
    data.append("upload_preset", "dbw3ells");

    const result = await fetch(
      `https://api.cloudinary.com/v1_1/jiwooproity/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    console.log(result.json());

    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "변환";
    a.click();
  };

  return (
    <>
      <Top />
      <CanvasContainer>
        <MediaBlockWrapper>
          <MediaBlockText>
            화면 사이즈는 990px 이상이어야 합니다.
          </MediaBlockText>
        </MediaBlockWrapper>
        <CanvasWrapper>
          <CanvasPickerBox>
            <MainCanvas
              ref={canvasRef}
              id="canvasJS"
              onMouseDown={startDraw}
              onMouseUp={finishDraw}
              onMouseLeave={finishDraw}
              onMouseMove={onDrawing}
            />
            <PickerWrapper>
              <PickerBox>
                <CustomPicker color={color} onChange={onChangeColor} />
                <StrokeSelect onChange={onChangeStroke}>
                  {_.map(lineWidth, (line, index) => (
                    <StrokeOption key={index} value={line.value}>
                      {`${line.name}`}
                    </StrokeOption>
                  ))}
                </StrokeSelect>
              </PickerBox>
              <PickerBox>
                <StrokeButton onClick={() => onLoad(true)} color={color}>
                  새로고침
                </StrokeButton>
                <StrokeButton onClick={() => onLoad(false)} color={color}>
                  지우기
                </StrokeButton>
                <StrokeButton onClick={() => saveImage()} color={color}>
                  다운로드
                </StrokeButton>
              </PickerBox>
            </PickerWrapper>
          </CanvasPickerBox>
        </CanvasWrapper>
      </CanvasContainer>
    </>
  );
};

export default Canvas;
