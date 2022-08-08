import styled from "styled-components";
import { SketchPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToolBox = styled.div`
  min-height: ${({ active }) => (active ? "0%" : "100%")};
  overflow: ${({ active }) => (active ? "hidden" : "")};
  opacity: ${({ active }) => (active ? "0" : "1")};
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
  transition: height 0.5s ease, min-height 0.5s ease, opacity 0.5s ease;

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

export { CustomSketch, PaletteStatus, SelectBox, SelectOption, ToolBox, ToolIcon, ToolSizeText, ToolWrap };
