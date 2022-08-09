import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Canvas = {};

Canvas.Container = styled.div`
  width: 100%;
  padding: 0px 15px;

  display: flex;
  justify-content: center;

  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 0px 0px;
  }
`;

Canvas.Wrapper = styled.div`
  width: 990px;
  min-height: ${({ active }) => (active ? "100vh" : "calc(100vh - 85px)")};
  padding: 0px 0px 30px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0px 0px 0px 0px;

    align-items: flex-start;
  }
`;

Canvas.PickerBox = styled.div`
  width: ${({ active }) => (active ? "100%" : "")};
  height: ${({ active }) => (active ? "100%" : "")};

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

Canvas.UploadWrapper = styled.label`
  width: 100%;
  padding: 15px 0px;
  margin: 0px 15px;

  display: ${({ active }) => (active ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  border: 1px dotted ${(props) => props.theme.backgroundOpacityColor};

  cursor: pointer;
  transition: border 0.5s ease;

  &:hover {
    h1 {
      transform: rotate(360deg);
    }
  }
`;

Canvas.UploadTitle = styled.h1`
  font-size: 15px;
  line-height: 15px;
  color: ${(props) => props.theme.backgroundOpacityColor};

  transition: transform 0.5s ease;
`;

Canvas.UploadInput = styled.input`
  display: none;
`;

Canvas.Canvas = styled.canvas`
  opacity: 1;
  z-index: 1;
  touch-action: none;

  border-radius: 5px;

  display: ${({ active }) => (active ? "none" : "block")};

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

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0px;
  }

  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: opacity 0.5s ease;
`;

Canvas.EraserIconWrapper = styled.div`
  width: ${({ stroke }) => `${stroke}px`};
  height: ${({ stroke }) => `${stroke}px`};

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  border: 1px solid rgba(245, 245, 245, 0.1);

  opacity: ${({ active }) => (active ? "1" : "0")};
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.5s ease;
  z-index: 999;

  background-color: rgba(245, 245, 245, 0.1);
`;

Canvas.EraseIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: white;
`;

Canvas.Preview = styled.canvas`
  border-radius: 5px;

  overflow: hidden;
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
`;

export { Canvas };
