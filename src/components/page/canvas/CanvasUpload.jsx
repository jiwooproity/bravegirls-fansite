import React from "react";
import { Top } from "components";

import {
  UploadButton,
  UploadContainer,
  UploadInnerWrapper,
  UploadInput,
  UploadInputWrapper,
  UploadPreviewWrapper,
  UploadTextField,
  UploadWrapper,
} from "style";

const CanvasUpload = (props) => {
  const { children } = props;
  const { data } = props;
  const { onChangeInput, uploadCanvas, hidden } = props;

  return (
    <UploadContainer active={hidden}>
      <Top />
      <UploadInnerWrapper>
        <UploadWrapper>
          <UploadPreviewWrapper>{children}</UploadPreviewWrapper>
          <UploadPreviewWrapper>
            <UploadInputWrapper>
              <UploadInput
                type={"text"}
                name={"name"}
                value={data.name}
                placeholder={"닉네임을 입력해주세요!"}
                onChange={onChangeInput}
                disabled={sessionStorage.getItem("login.nickname")}
              />
              <UploadInput type={"text"} name={"title"} value={data.title} placeholder={"업로드할 작품의 제목을 입력해주세요!"} onChange={onChangeInput} />
              <UploadTextField
                type={"text"}
                name={"description"}
                value={data.description}
                placeholder={"어떤 작품인지 설명해 주세요!"}
                onChange={onChangeInput}
              />
            </UploadInputWrapper>
          </UploadPreviewWrapper>
        </UploadWrapper>
        <UploadButton onClick={uploadCanvas}>UPLOAD</UploadButton>
      </UploadInnerWrapper>
    </UploadContainer>
  );
};

export default CanvasUpload;
