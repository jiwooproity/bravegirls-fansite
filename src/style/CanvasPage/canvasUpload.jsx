import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CanvasUpload = {};

CanvasUpload.Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  opacity: ${({ active }) => (active ? "1" : "0")};
  pointer-events: ${({ active }) => (active ? "all" : "none")};

  background-color: ${(props) => props.theme.backgroundColor};

  z-index: ${({ active }) => (active ? "1" : "0")};

  transition: opacity 0.5s ease, background-color 0.5s ease;
`;

CanvasUpload.Wrapper = styled.div`
  padding: 15px;

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

CanvasUpload.InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

CanvasUpload.PreviewWrapper = styled.div``;

CanvasUpload.InputBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px 15px;
`;

CanvasUpload.Input = styled.input`
  width: 400px;
  border: none;

  padding: 8px 10px 8px 0px;
  margin: 10px 0px 10px 0px;
  background-color: transparent;
  border-bottom: 1px solid ${(props) => props.theme.inputBottomColor};

  color: ${(props) => props.theme.titleTextColor};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.inputBottomActiveColor};
  }

  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.inputBottomActiveColor};
  }

  transition: border-bottom 0.5s ease;
`;

CanvasUpload.ButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  margin: 5px 0px 0px 0px;

  border-radius: 5px;
  background-color: ${(props) => props.theme.backgroundOpacityColor};

  &:hover {
    background-color: ${(props) => props.theme.black};
  }

  transition: background-color 0.5s ease, color 0.5s ease;
  cursor: pointer;
`;

CanvasUpload.TextField = styled.textarea`
  height: 100%;
  padding: 5px;

  border: 1px solid ${(props) => props.theme.inputBottomColor};
  border-radius: 5px;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.inputBottomActiveColor};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.inputBottomActiveColor};
  }

  resize: none;
  transition: border 0.5s ease;
`;

CanvasUpload.Icon = styled(FontAwesomeIcon)`
  font-size: 15px;
  font-weight: 700;

  color: ${(props) => props.theme.diffTitleTextColor};
`;

export { CanvasUpload };
