import React from "react";
import styled from "styled-components";

import _ from "lodash";

import { lineWidth, eraseLine } from "constant";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faArrowsRotate, faTrashCan, faCloudArrowDown, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { SketchPicker } from "react-color";

const ToolBox = styled.div`
  height: ${({ active }) => (active ? "0%" : "100%")};
  overflow: ${({ active }) => (active ? "hidden" : "")};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: -40px;
  border-radius: 5px;
  background-color: white;
  box-shadow: ${({ active }) => (active ? "none" : "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px")};
  z-index: 5;
  transform: translateY(-50%);
  transition: height 0.5s ease;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ToolWrap = styled.div`
  width: 35px;
  border-bottom: 1px solid rgba(54, 54, 54, 0.1);

  &:nth-child(1) {
    border-radius: 5px 5px 0px 0px;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  background-color: ${({ mode }) => (mode === "true" ? "rgba(54, 54, 54)" : "transparent")};
  color: ${({ mode }) => (mode === "true" ? "white" : "rgba(54, 54, 54)")};

  &:hover {
    background-color: ${({ mode }) => (mode === "true" ? "" : "rgba(230, 230, 230, 0.5)")};
  }

  cursor: pointer;
`;

const ToolSizeText = styled.span`
  font-size: 12px;
  line-height: 12px;
  padding: 2px 0px;

  display: block;

  color: rgba(54, 54, 54);
`;

const ToolIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  line-height: 20px;
  display: block;

  padding: 10px 5px;

  cursor: pointer;
`;

const PaletteStatus = styled.div`
  width: 100%;
  height: 15px;
  margin: 5px 2px;
  border-radius: 3px;

  background-color: ${({ color }) => `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`};

  position: relative;
`;

const CustomSketch = styled(SketchPicker)`
  position: absolute;
  top: 0;
  left: 38px;
`;

const SelectBox = styled.select`
  font-size: 12px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 35px;
`;

const SelectOption = styled.option`
  font-size: 12px;
`;

const CanvasTool = (props) => {
  const { active, color } = props;
  const { erase, brush, picker, stroke, eraseStroke } = props;
  const { setOpenBrush, setOpenErase, openBrush, openErase } = props;
  const { onChangeStroke, onChangeErase } = props;
  const { onChangeTool, onChangeColor, onRefresh, onDelete, saveImage, onPicker } = props;

  return (
    <ToolBox active={active}>
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
        <ToolIcon icon={faCloudArrowDown} onClick={saveImage} />
      </ToolWrap>
      <ToolWrap>
        <PaletteStatus color={color} onClick={onPicker} />
        {picker && <CustomSketch color={color.rgb} onChange={onChangeColor} />}
      </ToolWrap>
    </ToolBox>
  );
};

export default CanvasTool;
