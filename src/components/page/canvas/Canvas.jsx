import React, { useState, useEffect, useRef } from "react";

import { faEraser } from "@fortawesome/free-solid-svg-icons";

import { Top } from "components";
import CanvasTool from "./CanvasTool";

import { utils } from "util";

import {
  CanvasContainer,
  CanvasPickerBox,
  CanvasUpload,
  CanvasUploadInput,
  CanvasUploadText,
  CanvasWrapper,
  EraserModeIcon,
  EraserModeIconWrapper,
  MainCanvas,
} from "style";

const defaultColor = {
  rgb: { r: "0", g: "0", b: "0", a: "1" },
};

const Canvas = () => {
  let img = new Image();
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [ctxTag, setCtxTag] = useState();
  const [bgCtxTag, setBgCtxTag] = useState();
  const [stroke, setStroke] = useState(1.5);
  const [eraseStroke, setEraseStroke] = useState(10);
  const [color, setColor] = useState(defaultColor);
  const [isDrawing, setIsDrawing] = useState(false);
  const [uploadImage, setUploadImage] = useState(true);
  const [picker, setPicker] = useState(false);
  const [erase, setErase] = useState(false);
  const [brush, setBrush] = useState(true);
  const [openBrush, setOpenBrush] = useState(false);
  const [openErase, setOpenErase] = useState(false);

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
      ctxTag.clearRect(X - eraseStroke / 2, Y - eraseStroke / 2, eraseStroke, eraseStroke);
    };

    const haveTag = () => {
      ctxTag.lineCap = "round";
      ctxTag.lineJoin = "round";
      ctxTag.lineWidth = stroke;
      !erase && brush && draw();
      erase && isDrawing && remove();
    };

    ctxTag && haveTag();
  };

  // 색깔 변경
  const onChangeColor = (color) => {
    ctxTag.strokeStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setColor({ rgb: color.rgb });
  };

  // 선 굵기 변경
  const onChangeStroke = (e) => {
    const { value } = e.target;
    ctxTag.lineWidth = value;
    setStroke(value);
    setOpenBrush(false);
  };

  const onChangeErase = (e) => {
    const { value } = e.target;
    setEraseStroke(value);
    setOpenErase(false);
  };

  const onDelete = () => {
    ctxTag.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const onPicker = () => {
    setPicker(!picker);
  };

  const onChangeTool = () => {
    setErase(!erase);
    setBrush(!brush);
  };

  const onRefresh = () => {
    setUploadImage(true);
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
        <CanvasWrapper>
          <CanvasPickerBox active={uploadImage}>
            <CanvasUpload htmlFor={"image_upload"} active={uploadImage}>
              <CanvasUploadText>사진을 업로드 해주세요.</CanvasUploadText>
              <CanvasUploadInput type={"file"} id={"image_upload"} onChange={onLoad} />
            </CanvasUpload>
            <MainCanvas ref={bgCanvasRef} id="bgCanvasjs" active={uploadImage} />
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
            <CanvasTool
              active={uploadImage}
              color={color}
              stroke={stroke}
              eraseStroke={eraseStroke}
              erase={erase}
              brush={brush}
              picker={picker}
              setOpenBrush={setOpenBrush}
              openBrush={openBrush}
              setOpenErase={setOpenErase}
              openErase={openErase}
              onChangeColor={onChangeColor}
              onChangeTool={onChangeTool}
              onChangeStroke={onChangeStroke}
              onChangeErase={onChangeErase}
              onRefresh={onRefresh}
              onDelete={onDelete}
              saveImage={saveImage}
              onPicker={onPicker}
            />
          </CanvasPickerBox>
        </CanvasWrapper>
      </CanvasContainer>
      <EraserModeIconWrapper className="eraser" active={erase} stroke={eraseStroke}>
        <EraserModeIcon icon={faEraser} />
      </EraserModeIconWrapper>
    </>
  );
};

export default Canvas;
