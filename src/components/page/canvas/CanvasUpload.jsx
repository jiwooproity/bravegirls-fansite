import React from "react";
import { Top } from "components";

import { CanvasUpload as CSS, FontIcon } from "style";

const CanvasUpload = (props) => {
  const { children } = props;
  const { data } = props;
  const { onChangeInput, uploadCanvas, hidden } = props;

  return (
    <CSS.Container active={hidden}>
      <Top />
      <CSS.Wrapper>
        <CSS.InnerWrapper>
          <CSS.PreviewWrapper>{children}</CSS.PreviewWrapper>
          <CSS.PreviewWrapper>
            <CSS.InputBox>
              <CSS.Input
                type={"text"}
                name={"name"}
                value={data.name}
                placeholder={"닉네임을 입력해주세요!"}
                onChange={onChangeInput}
                disabled={sessionStorage.getItem("login.nickname")}
              />
              <CSS.Input type={"text"} name={"title"} value={data.title} placeholder={"업로드할 작품의 제목을 입력해주세요!"} onChange={onChangeInput} />
              <CSS.TextField
                type={"text"}
                name={"description"}
                value={data.description.split("<br/>").join("\r\n")}
                placeholder={"어떤 작품인지 설명해 주세요!"}
                onChange={onChangeInput}
              />
            </CSS.InputBox>
          </CSS.PreviewWrapper>
        </CSS.InnerWrapper>
        <CSS.ButtonWrapper onClick={uploadCanvas}>
          <CSS.Icon icon={FontIcon.Upload_C} />
        </CSS.ButtonWrapper>
      </CSS.Wrapper>
    </CSS.Container>
  );
};

export default CanvasUpload;
