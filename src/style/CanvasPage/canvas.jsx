import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    justify-content: center;
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

const CanvasUploadWrap = styled.label`
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

  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: opacity 0.5s ease;
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
  border: 1px solid rgba(245, 245, 245, 0.1);
  background-color: rgba(245, 245, 245, 0.1);

  opacity: ${({ active }) => (active ? "1" : "0")};

  pointer-events: none;

  z-index: 999;

  transition: opacity 0.5s ease;
`;

const EraserModeIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: white;
`;

const PreviewCanvas = styled.canvas`
  border-radius: 5px;
  overflow: hidden;

  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
`;

export {
  CanvasContainer,
  CanvasPickerBox,
  CanvasUploadWrap,
  CanvasUploadInput,
  CanvasUploadText,
  CanvasWrapper,
  EraserModeIcon,
  EraserModeIconWrapper,
  MainCanvas,
  PreviewCanvas,
};
