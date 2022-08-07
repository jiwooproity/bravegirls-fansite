import styled, { css } from "styled-components";

const CanvasDetailContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 15px 0px 15px;

  display: flex;
  justify-content: center;
`;

const DetailImageContainer = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasDetailWrapper = styled.div`
  display: flex;
  padding: 0px 0px 50px 0px;

  ${({ vertical }) =>
    vertical
      ? css`
          @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
          }
        `
      : css`
          flex-direction: column;
          align-items: center;
        `}

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasDetailInfo = styled.div`
  ${({ vertical }) =>
    vertical
      ? css`
          padding: 0px 15px;

          @media screen and (max-width: 768px) {
            width: 100%;
            padding: 15px 0px 50px 0px;
          }
        `
      : css`
          padding: 15px 0px 50px 0px;
          width: 100%;
        `}
`;

const CanvasTitle = styled.h1`
  font-size: 30px;
  line-height: 30px;

  padding: 0px 0px 5px 0px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CanvasDetailText = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: ${(props) => props.theme.titleTextColor};

  white-space: pre-wrap;
`;

const DetailImageWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
  border-radius: 5px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

const CommentWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const CommentBox = styled.div`
  &:nth-child(1) {
    display: flex;
  }

  &:nth-child(2) {
    display: flex;
    flex-direction: column;

    white-space: nowrap;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0px 0px 0px;
  }
`;

const CommentInsertButton = styled.button`
  font-size: 15px;
  height: 100%;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.backgroundOpacityColor};
  color: ${(props) => props.theme.diffTitleTextColor};

  &:focus {
    outline: none;
  }

  transition: color 0.5 ease, background-color 0.5s ease;
  cursor: pointer;
`;

const CommentInfo = styled.div`
  width: 100%;
  padding: 0px 0px 5px 0px;
`;

const CommentNumber = styled.span`
  font-size: 12px;
  line-height: 12px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CommentInput = styled.input`
  border: none;
  border: 1px solid ${(props) => props.theme.inputBottomColor};
  background-color: transparent;

  padding: 5px;
  margin-bottom: 5px;

  color: ${(props) => props.theme.titleTextColor};

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CommentTextField = styled.textarea`
  width: 100%;
  height: 100px;

  padding: 5px;

  border: 1px solid ${(props) => props.theme.inputBottomColor};
  background-color: transparent;

  &:focus {
    outline: none;
  }

  transition: border 0.5s ease;
`;

const CommentListWrapper = styled.div`
  width: 100%;

  cursor: pointer;
`;

const CommentNoneWrapper = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentNoneText = styled.span`
  font-size: 12px;
  line-height: 12px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CommentList = styled.div`
  width: 100%;
  padding: 15px 0px;
  border-bottom: 1px solid ${(props) => props.theme.inputBottomColor};
`;

const CommentUserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0px 0px 0px;
`;

const CommentUserName = styled.span`
  font-size: 14px;
  line-height: 14px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CommentText = styled.span`
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.theme.titleTextColor};

  white-space: pre-wrap;
`;

const CommentProfile = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 5px 0px 0px;

  display: block;
`;

export { CanvasDetailContainer, CanvasDetailInfo, CanvasDetailText };
export { CanvasDetailWrapper, CommentBox, CommentInfo, CommentInput };
export { CommentInsertButton, CommentList, CommentListWrapper };
export { CommentNumber, CommentText, CommentTextField, CanvasTitle };
export { CommentUserName, CommentUserWrapper, CommentWrapper };
export { DetailImage, DetailImageContainer, DetailImageWrapper };
export { CommentProfile, CommentNoneWrapper, CommentNoneText };
