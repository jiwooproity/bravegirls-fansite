import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { faEraser } from "@fortawesome/free-solid-svg-icons";

import { Loading, Top } from "components";
import { CanvasTool, CanvasUpload } from "components";
import { canvasService } from "services";
import { utils } from "util";

import { Canvas as CSS } from "style";

const defaultColor = {
  rgb: { r: "0", g: "0", b: "0", a: "1" },
};

const Canvas = () => {
  let img = new Image();
  const navigate = useNavigate();

  // 사용자가 그리기 시작했는 지 확인
  const [modify, setModify] = useState(false);
  // 업로드 상태 시작 / 마무리
  const [uploading, setUploading] = useState(false);
  // 캔버스 크기를 확인하기 위한 State
  const [size, setSize] = useState({ width: 0, height: 0 });

  // 캔버스 Context 데이터
  const canvasRef = useRef(null);
  const [ctxTag, setCtxTag] = useState();

  const bgCanvasRef = useRef(null);
  const [bgCtxTag, setBgCtxTag] = useState();

  const previewRef = useRef(null);
  const [previewCtxTag, setPreviewCtxTag] = useState();

  // 브러쉬 굵기, 지우개 크기, 컬러 저장
  const [stroke, setStroke] = useState(1.5);
  const [eraseStroke, setEraseStroke] = useState(10);
  const [color, setColor] = useState(defaultColor);

  // 그리는 상태인지 아닌지 (클릭)
  const [isDrawing, setIsDrawing] = useState(false);

  // 다음 단계
  const [uploadImage, setUploadImage] = useState(true);

  // ON, OFF
  const [picker, setPicker] = useState(false);
  const [erase, setErase] = useState(false);
  const [brush, setBrush] = useState(true);

  // 펜 & 지우개 굵기, 크기 선택 모드
  const [openBrush, setOpenBrush] = useState(false);
  const [openErase, setOpenErase] = useState(false);

  // 이미지 업로드 Params
  const [insertData, setInsertData] = useState({
    upload: false,
    name: "",
    title: "",
    description: "",
  });

  // 아이디가 존재할 경우 닉네임 자동 입력
  useEffect(() => {
    if (sessionStorage.getItem("login.nickname")) {
      setInsertData({
        ...insertData,
        name: sessionStorage.getItem("login.nickname"),
      });
    }
    // eslint-disable-next-line
  }, []);

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
      const preview = previewRef.current;
      const ctx = canvas.getContext("2d");
      const bgCtx = background.getContext("2d");
      const preCtx = preview.getContext("2d");
      // const isOver = img.width > 990;
      const isHori = img.width > img.height;
      const isRect = img.width - img.height < 50;

      const getCanvas = setCanvas(ctx, isHori ? (isRect ? 660 : 990) : 440);
      const getBgCanvas = setCanvas(bgCtx, isHori ? (isRect ? 660 : 990) : 440);
      const getPreCanvas = setCanvas(preCtx, 400);

      getBgCanvas[1].drawImage(img, 0, 0, bgCtx.canvas.width, getBgCanvas[0]);
      setCtxTag(getCanvas[1]);
      setBgCtxTag(getBgCanvas[1]);
      setPreviewCtxTag(getPreCanvas[1]);

      setUploadImage(false);
      setSize({ width: img.width, height: img.height });
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
      if (isDrawing && !modify) {
        setModify(true);
      }

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
      setModify(false);
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

  const onChangeInput = (e) => {
    let { name, value } = e.target;

    if (_.isEqual(name, "description")) {
      value = utils.onComment({ value });
    }

    setInsertData({
      ...insertData,
      [name]: value,
    });
  };

  const uploadCanvas = async () => {
    const sendAlert = ({ msg }) => {
      alert(msg);
    };

    if (!modify) {
      sendAlert({ msg: "그림을 그려주세요 !" });
    } else {
      const { width, height } = size;
      const { upload, title, name, description } = insertData;
      bgCtxTag.drawImage(canvasRef.current, 0, 0);

      const onNext = () => {
        const { width: w, height: h } = previewCtxTag.canvas;
        previewCtxTag.drawImage(bgCanvasRef.current, 0, 0, 400, (h / w) * 400);
        setInsertData({ ...insertData, upload: true });
      };

      const onUpload = async () => {
        const isTitle = _.isEmpty(title);
        const isDescription = _.isEmpty(description);

        if (isTitle || isDescription) {
          sendAlert({ msg: "작품에 대한 제목과 설명을 입력해주세요!" });
        } else {
          setUploading(true);
          const data = new FormData();
          let imageURL = bgCanvasRef.current.toDataURL("image/png");

          data.append("file", imageURL);
          data.append("upload_preset", "dbw3ells");

          const upload = await canvasService.canvasUpload({ data });
          const url = upload.url;
          const isHori = width > height;
          const isRect = width - height < 50;

          const params = {
            title: title,
            name: name,
            description: description,
            canvas: url,
            vertical: isHori ? (isRect ? "1" : "0") : "1",
          };

          await canvasService.canvasInsert({ data: params }).then(() => {
            setUploading(false);
            navigate("/canvas/board");
          });
        }
      };

      upload ? onUpload() : onNext();
    }
  };

  const saveImage = async () => {
    if (uploadImage) return;
    bgCtxTag.drawImage(canvasRef.current, 0, 0);
    let imageURL = bgCanvasRef.current.toDataURL("image/png");

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
      {!uploadImage && <Top />}
      {uploading && <Loading />}
      <CSS.Container>
        <CSS.Wrapper active={uploadImage}>
          <CSS.PickerBox active={uploadImage}>
            {/* 업로드 버튼 및 파일 등록 */}
            <CSS.UploadWrapper htmlFor={"image_upload"} active={uploadImage}>
              <CSS.UploadTitle>사진을 업로드 해주세요.</CSS.UploadTitle>
              <CSS.UploadInput type={"file"} id={"image_upload"} onChange={onLoad} />
            </CSS.UploadWrapper>
            {/* 그림 그리기 영역 */}
            <CSS.Canvas ref={bgCanvasRef} id="bgCanvasjs" active={uploadImage} />
            <CSS.Canvas
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
              hidden={insertData.upload}
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
              uploadCanvas={uploadCanvas}
              onPicker={onPicker}
            />
          </CSS.PickerBox>
          <CanvasUpload hidden={insertData.upload} data={insertData} onChangeInput={onChangeInput} uploadCanvas={uploadCanvas}>
            <CSS.Preview ref={previewRef} id="previewCanvas" />
          </CanvasUpload>
        </CSS.Wrapper>
      </CSS.Container>
      <CSS.EraserIconWrapper className="eraser" active={erase} stroke={eraseStroke}>
        <CSS.EraseIcon icon={faEraser} />
      </CSS.EraserIconWrapper>
    </>
  );
};

export default Canvas;
