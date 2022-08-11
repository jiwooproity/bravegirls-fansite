import styled from "styled-components";

const CanvasUpload = {};

CanvasUpload.Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  opacity: ${({ active }) => (active ? "1" : "0")};
  pointer-events: ${({ active }) => (active ? "all" : "none")};

  background-color: ${(props) => props.theme.backgroundColor};

  z-index: ${({ active }) => (active ? "1" : "0")};

  transition: opacity 0.5s ease, background-color 0.5s ease;
`;

CanvasUpload.Wrapper = styled.div``;

CanvasUpload.InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

CanvasUpload.PreviewWrapper = styled.div``;

CanvasUpload.InputBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 15px 15px 15px;
`;

CanvasUpload.Input = styled.input`
  width: 400px;
  border: none;

  padding: 8px 10px 8px 0px;
  margin: 0px 0px 10px 0px;
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

CanvasUpload.Button = styled.button`
  width: 100%;

  font-size: 15px;
  font-weight: 700;

  margin: 20px 0px 0px 0px;
  padding: 8px 10px;

  border: none;

  color: ${(props) => props.theme.diffTitleTextColor};
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

export { CanvasUpload };
