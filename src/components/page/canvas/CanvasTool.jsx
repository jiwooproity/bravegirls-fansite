import React from "react";

import _ from "lodash";

import { faEraser, faArrowsRotate, faTrashCan, faFileDownload, faFileUpload, faPaintBrush } from "@fortawesome/free-solid-svg-icons";

import { lineWidth, eraseLine } from "constant";
import { CustomSketch, PaletteStatus, SelectBox, SelectOption, ToolBox, ToolIcon, ToolSizeText, ToolWrap } from "style";

const CanvasTool = (props) => {
  const { hidden, active, color } = props;
  const { erase, brush, picker, stroke, eraseStroke } = props;
  const { setOpenBrush, setOpenErase, openBrush, openErase } = props;
  const { onChangeStroke, onChangeErase } = props;
  const { onChangeTool, onChangeColor, onRefresh, onDelete, onPicker } = props;
  const { uploadCanvas, saveImage } = props;

  return (
    <ToolBox active={active || hidden}>
      <ToolWrap mode={brush ? "true" : "false"}>
        <ToolIcon icon={faPaintBrush} onClick={onChangeTool} />
      </ToolWrap>
      <ToolWrap>
        <ToolSizeText onClick={() => setOpenBrush(!openBrush)}>굵기</ToolSizeText>
        {openBrush && (
          <SelectBox value={stroke} onChange={onChangeStroke}>
            {_.map(lineWidth, (line, index) => (
              <SelectOption key={index} value={line.value}>
                {line.name}
              </SelectOption>
            ))}
          </SelectBox>
        )}
      </ToolWrap>
      <ToolWrap mode={erase ? "true" : "false"}>
        <ToolIcon icon={faEraser} onClick={onChangeTool} />
      </ToolWrap>
      <ToolWrap>
        <ToolSizeText onClick={() => setOpenErase(!openErase)}>크기</ToolSizeText>
        {openErase && (
          <SelectBox value={eraseStroke} onChange={onChangeErase}>
            {_.map(eraseLine, (line, index) => (
              <SelectOption key={index} value={line.value}>
                {line.name}
              </SelectOption>
            ))}
          </SelectBox>
        )}
      </ToolWrap>
      <ToolWrap>
        <ToolIcon icon={faArrowsRotate} onClick={onDelete} />
      </ToolWrap>
      <ToolWrap>
        <ToolIcon icon={faTrashCan} onClick={onRefresh} />
      </ToolWrap>
      <ToolWrap>
        <ToolIcon icon={faFileUpload} onClick={uploadCanvas} />
      </ToolWrap>
      <ToolWrap>
        <ToolIcon icon={faFileDownload} onClick={saveImage} />
      </ToolWrap>
      <ToolWrap>
        <PaletteStatus color={color} onClick={onPicker} />
        {picker && <CustomSketch color={color.rgb} onChange={onChangeColor} />}
      </ToolWrap>
    </ToolBox>
  );
};

export default CanvasTool;
