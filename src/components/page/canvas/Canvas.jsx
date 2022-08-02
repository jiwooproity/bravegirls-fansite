import { Top } from "components";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

import canvasImage01 from "static/img/canvas_01.jpg";
import canvasImage02 from "static/img/canvas_02.jpg";
import canvasImage03 from "static/img/canvas_03.jpg";
import canvasImage04 from "static/img/canvas_04.jpg";
import { SketchPicker } from "react-color";

const CanvasContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  padding: 0px 15px 30px 15px;

  display: flex;
  justify-content: center;
`;

const CanvasWrapper = styled.div`
  width: 990px;
  height: 100%;
`;

const MainCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StrokeButton = styled.button`
  font-size: 15px;
  line-height: 15px;

  padding: 2px 5px;
  margin: 5px;

  border: none;
  border: 1px solid rgba(54, 54, 54);
  color: black;
  background-color: white;
`;

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [random, setRandom] = useState(0);
  const [ctxTag, setCtxTag] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [stroke, setStroke] = useState(1.5);

  const imageArr = [canvasImage01, canvasImage02, canvasImage03, canvasImage04];

  let img = new Image();

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  const onLoad = () => {
    let math = Math.floor(Math.random() * 4);
    img.src = imageArr[math];

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.strokeStyle = color;
      ctx.lineWidth = stroke;
      ctx.canvas.width = canvasRef.current.offsetWidth;
      ctx.canvas.height = (img.height / img.width) * canvasRef.current.offsetWidth;
      contextRef.current = ctx;

      const calHeight = (img.height / img.width) * ctx.canvas.width;

      ctx.drawImage(img, 0, 0, ctx.canvas.width, calHeight);
      setCtxTag(contextRef.current);

      setRandom(math);
    };
  };

  const onRefresh = () => {
    let math = random;
    img.src = imageArr[math];

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.strokeStyle = color;
      ctx.lineWidth = stroke;
      ctx.canvas.width = canvasRef.current.offsetWidth;
      ctx.canvas.height = (img.height / img.width) * canvasRef.current.offsetWidth;
      contextRef.current = ctx;

      const calHeight = (img.height / img.width) * ctx.canvas.width;

      ctx.drawImage(img, 0, 0, ctx.canvas.width, calHeight);
      setCtxTag(contextRef.current);

      setRandom(math);
    };
  };

  const startDraw = (e) => {
    e.persist();
    setIsDrawing(true);
  };

  const finishDraw = () => {
    setIsDrawing(false);
  };

  const onDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctxTag) {
      ctxTag.lineCap = "round";

      if (!isDrawing) {
        ctxTag.beginPath();
        ctxTag.moveTo(offsetX, offsetY);
      } else {
        ctxTag.lineTo(offsetX, offsetY);
        ctxTag.stroke();
      }
    }
  };

  const onChangeColor = (color) => {
    ctxTag.strokeStyle = color.hex;
    setColor(color.hex);
  };

  const onChangeStroke = (stroke) => {
    ctxTag.lineWidth = stroke;
    setStroke(stroke);
  };

  return (
    <>
      <Top />
      <CanvasContainer>
        <CanvasWrapper>
          <MainCanvas
            ref={canvasRef}
            id="canvasJS"
            width={"100%"}
            height={"100%"}
            onMouseDown={startDraw}
            onMouseUp={finishDraw}
            onMouseLeave={finishDraw}
            onMouseMove={onDrawing}
          />
          <PickerWrapper>
            <SketchPicker color={color} onChange={onChangeColor} />
            <StrokeButton onClick={() => onChangeStroke(1.5)}>굵기 1.5</StrokeButton>
            <StrokeButton onClick={() => onChangeStroke(2)}>굵기 2</StrokeButton>
            <StrokeButton onClick={() => onChangeStroke(2.5)}>굵기 2.5</StrokeButton>
            <StrokeButton onClick={() => onChangeStroke(3)}>굵기 3</StrokeButton>
            <StrokeButton onClick={() => onChangeStroke(5)}>굵기 5</StrokeButton>
            <StrokeButton onClick={() => onChangeStroke(10)}>굵기 10</StrokeButton>
            <StrokeButton onClick={() => onLoad()}>새로고침</StrokeButton>
            <StrokeButton onClick={() => onRefresh()}>지우기</StrokeButton>
          </PickerWrapper>
        </CanvasWrapper>
      </CanvasContainer>
    </>
  );
};

export default Canvas;
