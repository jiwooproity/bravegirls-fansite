import { Top } from "components";
import React from "react";
import styled from "styled-components";

const UploadContainer = styled.div`
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

const UploadInnerWrapper = styled.div``;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadPreviewWrapper = styled.div``;

const UploadInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 15px 15px 15px;
`;

const UploadInput = styled.input`
  width: 400px;
  border: none;

  padding: 8px 10px 8px 0px;
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

const UploadButton = styled.button`
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

const CanvasUpload = (props) => {
  const { children } = props;
  const { onChangeInput, uploadCanvas, hidden } = props;

  return (
    <UploadContainer active={hidden}>
      <Top />
      <UploadInnerWrapper>
        <UploadWrapper>
          <UploadPreviewWrapper>{children}</UploadPreviewWrapper>
          <UploadPreviewWrapper>
            <UploadInputWrapper>
              <UploadInput type={"text"} name={"name"} placeholder={"닉네임을 입력해주세요!"} onChange={onChangeInput} />
              <UploadInput type={"text"} name={"title"} placeholder={"업로드할 작품의 제목을 입력해주세요!"} onChange={onChangeInput} />
              <UploadInput type={"text"} name={"description"} placeholder={"어떤 작품인지 설명해 주세요!"} onChange={onChangeInput} />
            </UploadInputWrapper>
          </UploadPreviewWrapper>
        </UploadWrapper>
        <UploadButton onClick={uploadCanvas}>UPLOAD</UploadButton>
      </UploadInnerWrapper>
    </UploadContainer>
  );
};

export default CanvasUpload;
